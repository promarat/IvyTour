import React, { useEffect, useRef, useState } from 'react'
import { init, Helpers } from '@api.stream/studio-kit'
import { Participants } from './components/Participant';
import axios from 'axios'
import { ControlPanel, DeviceSelection } from './components/Devices';
import { Chat } from './components/Chat';
import Popup from './components/Popup';
import MapPop from './components/MapPop';
import { AppProvider } from './context.tsx';
import { nanoid } from 'nanoid'

const { useStudio } = Helpers.React
const StudioProvider = Helpers.React.StudioProvider;
const { ScenelessProject } = Helpers

export const generateId = () => (Math.random() * 1e20).toString(36)

const Login = (props) => {

    const login = async (event) => {
        event.preventDefault()

        let token = "";
        
        // await axios({
        //     method: "GET",
        //     url: `${process.env.REACT_APP_API_URL}/stream/auth`,
        //     withCredentials: true,
        // }).then(response => {
        //     token = response.data;
        // }).catch(error => {
        //     console.log(error);
        // })

        // For Demo
        const http = axios.create({
          baseURL: `${process.env.REACT_APP_API_URL}`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
          },
        })

        let res = await http.get(`/auth/${nanoid(21)}`)
        console.log(res)
        token = res.data

        console.log(token)
        props.onLogin(token);
        console.log(localStorage['token']);
    } 

    return (
        // Possibly build login component/page in place of this
        <div>
            <button onClick={login} >Login To Stream</button>
        </div>
    )
}

// API.STREAM Guide Project View
const Project = () => {
  const { studio, project, room, projectCommands, setProject } = useStudio()
  const [ background, setBackground ] = useState(null)
  const [ videooverlays, setVideooverlays] = useState([])
  const renderContainer = useRef()
  const { Command } = studio
  const [isLive, setIsLive] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [map, setMap] = useState(false)
  const [settings, setSettings] = useState(false)
  const [waitingRoom, setWaitingRoom] = useState({
    users: {}
  });

  // Listen for project events
  useEffect(() => {
    return project.subscribe((event, payload) => {
      if (event === 'BroadcastStarted') {
        console.log("Broadcast Started");
        setIsLive(true)
      } else if (event === 'BroadcastStopped') {
        console.log("Broadcast Stopped");
        setIsLive(false)
      }
    })
  }, [])

  // Used to get media
  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: `${process.env.REACT_APP_API_URL}/guides/media`,
  //     withCredentials: true,
  //   }).then(response => {
  //     setVideooverlays([...videooverlays, ...response.data.tours]);
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // }, [])

  // Listen for room events
  useEffect(() => {
    room.onData((data, senderId) => {
      if(data.type === "UserJoined") {
        let current = waitingRoom.users;
        current[senderId] = room.getParticipant(senderId).displayName;
        setWaitingRoom({users: current});
      }
    })
  }, [waitingRoom]);

  useEffect(() => {
    studio.render({
      containerEl: renderContainer.current,
      projectId: project.id,
      dragAndDrop: false,
    });
    
  }, [renderContainer.current])

  // In case we live stream - this has nothing to do with the webrtc call
  const startBroadCast = async (event) => {
    event.preventDefault();
    
    await Command.setDestination({
      projectId: project.id,
      rtmpKey: '',
      rtmpUrl: '',
    })
    Command.startBroadcast({projectId: project.id});
    console.log("Started");
  }

  const stopBroadCast = (event) => {
    event.preventDefault();

    Command.stopBroadcast({projectId: project.id});
    console.log("Stopped");
  }

  // For Demo
  const [guestUrl, setGuestUrl] = useState('')
  const createGuestAccess = async (event) => {
    event.preventDefault();
    
    
    // axios({
    //   method: "GET",
    //   url: `${process.env.REACT_APP_API_URL}/stream/guestAuth`,
    //   withCredentials: true,
    //   data: {
    //     displayName: "charles"
    //   }
    // }).then(response => {
    //   console.log(response.data);
    // }).catch(error => {
    //   console.log(error);
    // })

    studio.createGuestLink('http://localhost:3006/student').then(setGuestUrl)
  }

  // Sends room data to guest to exit breakout room
  const allowGuest = async (event) => {
    event.preventDefault();
    room.sendData({type: "AllowGuest"}, [event.target.value]);
    let current = waitingRoom.users;
    delete current[event.target.value];
    setWaitingRoom({users: current});
  }

  // delete project in case of issues - don't use
  const deleteProject = async (event) => {
    studio.Command.deleteProject({projectId: project.id});
    setProject(null);
  }

  // For Google Maps - Sends room data to other guests to open/close map
  const toggleMap = async (event) => {
    event.preventDefault()
    
    if (map) {
      setMap(false)
      room.sendData({type: "MapDead"})
    } else {
      setMap(true)
      room.sendData({type: "MapLive", pos: {lat: 43, lng: 43}})
    }
  }

  // Just to hide camera and mic settings
  const toggleSettings = async (event) => {
    event.preventDefault()
    
    if (settings) {
      setSettings(false)
    } else {
      setSettings(true)
    }
  }

  // For testing purposes - don't use
  const testBTN = async (event) => {
    event.preventDefault()
    let a = new (project);
    console.log("ACTUAL: ", projectCommands)
    console.log("COMMAND: ", a)
    a.addHiddenOverlay()
  }

  // Mini waiting room component
  const WaitingRoom = () => {
    return(
      <div>
        Waiting Room
        <select onChange={allowGuest}>
          <option value="">Select</option>
          {
            Object.entries(waitingRoom.users).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))
          }
        </select>
      </div>
    )
  }

  // Component for all of the tour videos
  const VideoSelection = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
        <h1>Media</h1>
        <div>
          {videooverlays.map((overlay) => (
            <li
              style={{ listStyle: 'none' }}
              key={overlay.id}
              onClick={ async (event) => {
                event.preventDefault();
                if (selectedVideo !== overlay.id) {
                  setSelectedVideo(overlay.id)
                  projectCommands.addVideoOverlay2(overlay.id, {
                    src: overlay.url
                  })

                  
                } else {
                  projectCommands.removeVideoOverlay2('111')
                  setSelectedVideo(null);
                }
              }}
            >
              <video width="200px" src={overlay.poster}/>
            </li>
          ))}
        </div>
      </div>
    );
  };

  // API.STREAM checks

  if (!room) return null

  // Returning actual guide view
  return (
    <div className="bg-gray-400">
      <div style={{ fontSize: 11, marginBottom: 14 }}>
        Logged in as HOST
        <div>
          <a
            onClick={() => {
              // Clear the session and reload
              localStorage.removeItem('token')
              window.location.reload()
            }}
          >
            Log out
          </a>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="relative">
          <div
            ref={renderContainer}
            className="rounded-[8px] overflow-hidden"
          />
          <MapPop trigger={map} room={room} />
          <Popup trigger={settings} setTrigger={setSettings}>
            <DeviceSelection />
          </Popup>
        </div>
        <Chat />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
          <div style={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <VideoSelection />
            <ControlPanel />
            <button onClick={toggleMap}>Toggle Map</button>
            <button onClick={toggleSettings}>Toggle Settings</button>
          </div>
          {/* <div style={{ width: '60%', position: 'relative'}}>
            <div id="helloworlds" ref={renderContainer}></div>
            <MapPop trigger={map} room={room} />
            <Popup trigger={settings} setTrigger={setSettings}>
              <DeviceSelection />
            </Popup>
          </div> */}
          <div style={{width: '20%'}}>
            {/* <Chat /> */}
            <button onClick={createGuestAccess}>Guest</button>
            <a href={guestUrl}>Guest Link</a>
            <WaitingRoom />
          </div>
        </div>
        <div>
          <Participants />
        </div>
      </div>
    </div>
  )
}

// ** DON'T TOUCH **
// Core setup for API.STREAM
// Once authenticated with API.STREAM, the above Project component is rendered
export const HostView = () => {
  const {
    studio,
    project,
    projectCommands,
    room,
    setProject,
    setRoom,
    setStudio,
  } = useStudio()
  const [token, setToken] = useState(localStorage['token'])
  const [failure, setFailure] = useState(null)

  // Store as a global for debugging in console
  window.SDK = useStudio()

  useEffect(() => {
    init()
      .then(setStudio)
      .catch((e) => {
        console.warn('Failed to initialize', e)
        setFailure(e.message)
      })
  }, [])

  useEffect(() => {
    if (!studio) return

    // If the SDK detects a token in the URL, it will return the project
    //  associated with it (e.g. guest view)
    setProject(studio.initialProject)
  }, [studio])
  
  useEffect(() => {
    if (!token || !studio || project) return
    // Log in
    studio
      .load(token)
      .then(async (user) => {
        // If there's a project, return it - otherwise create one
        
        let project = user.projects[0]
    
        if (!project) { 
          project = await ScenelessProject.create();
          // await axios({
          //   method: "POST",
          //   url: `${process.env.REACT_APP_API_URL}/stream/project`,
          //   withCredentials: true,
          //   data: {
          //     collectionId: user.id,
          //     projectId: project.id 
          //   }
          // }).then(response => {
          //   console.log(response);
          // }).catch(error => {
          //   console.log(error);
          // })
        }
        
        console.log(project.id, user.id);
        const activeProject = await studio.Command.setActiveProject({
          projectId: project.id,
        })
        const room = await activeProject.joinRoom({
          displayName: nanoid(6),
        })
        
        setRoom(room)
        setProject(activeProject)

      })
      .catch((e) => {
        console.warn(e)
        setToken(null)
      })
  }, [studio, token, project])

  useEffect(() => {
    if (room) {
      room.sendData({ type: 'UserJoined' })
    }
  }, [room])

  useEffect(() => {
    if (!projectCommands || !room) return
    // Prune non-existent participants from the project
    projectCommands.pruneParticipants()
  }, [projectCommands, room])

  if (project && room) {
    return <Project />
  }
  if (studio && !token) {
    return (
      <Login
        onLogin={(token) => {
          setToken(token)
          localStorage.setItem('token', token)
        }}
      />
    )
  }
  if (failure) {
    return <div>Failed to initialize: `{failure}`</div>
  }
  return <div>Loading...</div>
}

// ** DON'T TOUCH **
const Guide = () => {
    return (
      <AppProvider isHost={true}>
        <StudioProvider>
            <HostView />
        </StudioProvider>
      </AppProvider>
    );
}

export default Guide;