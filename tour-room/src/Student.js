import { useContext, useEffect, useRef, useState } from 'react'
import { init, Helpers, SDK } from '@api.stream/studio-kit'
import { Participants } from './components/Participant';
import { Chat } from './components/Chat';
import { ControlPanel, DeviceSelection } from './components/Devices';
import StudMapPop from './components/StudMapPop';
const StudioProvider = Helpers.React.StudioProvider;

const { Room } = Helpers
const { useStudio } = Helpers.React

const DEFAULT_GUEST_NAME = 'Guest-' + Math.floor(Math.random() * 1e4)

const Project = () => {
  const { studio, project, room } = useStudio()
  const renderContainer = useRef()
  const [isLive, setIsLive] = useState(false)
  const [vid, setVid] = useState(false);
  const [pro, setPro] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState(false);
  const [pos, setPos] = useState({lat: 42.345573, lng: -71.098326});
  const [map, setMap] = useState(null)

  useEffect(() => {
    Room.ensureDevicePermissions()
  })

  // Listen for project events
  useEffect(() => {
    return project.subscribe((event, payload) => {
      console.log("Project: ", event, payload)
      if (event === 'BroadcastStarted') {
        setIsLive(true)
      } else if (event === 'BroadcastStopped') {
        setIsLive(false)
      }
    })
  }, [])

  // Renders main video/image component -shadow dom
  useEffect(() => {
    console.log(project.props)
    studio.render({
      containerEl: renderContainer.current,
      projectId: project.id,
      dragAndDrop: false, // Disable controls for guests
    })
  }, [renderContainer.current])

  // Room listeners
  useEffect(() => {
    if(!room) return;
    room.onData((data, senderId) => {
      if(room.getParticipant(senderId).role === "ROLE_HOST" && data.type === "MapLive") {
        console.log(data)
        setToggle(true)
      }

      if(room.getParticipant(senderId).role === "ROLE_HOST" && data.type === "MapDead") {
        console.log(data)
        setToggle(false)
      }
    })
  }, [room]);

  // Room listeners
  useEffect(() => {
    if(!room) return;
    room.onData((data, senderId) => {
      if(room.getParticipant(senderId).role === "ROLE_HOST" && data.type === "PosChanged") {
        console.log("DATA: ", data.pos)
        project.props.panorama.setPosition(data.pos)
      }
    })
  }, [room]);

    // API.STREAM checks

  if (!room) return null

  // Returning actual student view
  return (
    <div>
      <div style={{position: "relative"}}>
        <div ref={renderContainer} id="helloworlds"></div>
        <StudMapPop trigger={toggle} pos={pos} tap={setMap}></StudMapPop>
      </div>
      
      <Chat />
      {isLive && <div style={{ fontWeight: 'bold' }}>You're live!</div>}
    </div>
  )
}

// ** DON'T TOUCH **
// Core setup for API.STREAM
// Once authenticated with API.STREAM, the above Project component is rendered
export const GuestView = () => {
  const { studio, project, room, setStudio, setProject, setRoom } = useStudio()
  const [joining, setJoining] = useState(false)
  const [displayName, setDisplayName] = useState(DEFAULT_GUEST_NAME)
  const [participant, setParticipant] = useState()
  const [error, setError] = useState()
  const [inRoom, setInRoom] = useState(false)
  const [allow, setAllow] = useState(false);
  // Store as a global for debugging in console
  window.SDK = useStudio()

  // Listen for room participants
  useEffect(() => {
    if (!room) return
    return room.useParticipant(room.participantId, setParticipant)
  }, [room])

  // Initialize studio
  useEffect(() => {
    if (!joining) return
    if (!studio) {
      init()
        .then(setStudio)
        .catch((e) => {
          console.warn(e)
          setError(e.message)
        })
    }
  }, [joining])

  // Initialize project
  useEffect(() => {
    if (!studio) return

    if (studio.initialProject) {
      // If the SDK detects a token in the URL, it will return the project
      //  associated with it (e.g. guest view)
      setProject(studio.initialProject)
    } else {
      setError('Invalid token')
    }
  }, [studio])

  // Initialize room
  useEffect(() => {
    if (!project || inRoom) return
    setInRoom(true)
    project
      .joinRoom({
        displayName,
      })
      .then((room) => {
        setJoining(false)
        setRoom(room)
      })
      .catch((e) => {
        setError(e.message)
        setInRoom(false)
      })
  }, [project, room])

  useEffect(()=>{
    if(room){
      room.sendData({type : "UserJoined"});
    }
  },[room])

  // Setup for breakout room mode
  useEffect(() => {
    if(!room) return;
    room.onData((data, senderId) => {
      if(room.getParticipant(senderId).role === "ROLE_HOST" && data.type === "AllowGuest") {
        setAllow(true);
      }
    })
  }, [room, allow]);

  if (error) {
    return <div>{error}</div>
  }

  if (joining) {
    return <div>Joining as {displayName}...</div>
  }

  // Student "login" screen
  if (!room) {
    return (
      <div style={{display: 'flex', top: "37.5%", justifyContent: 'center', alignItems: 'center', background: 'gray', width: "45%", height: "25%", position: "absolute", overflow: "hidden"}}>
        <form
          style={{ width: 400, alignItems: 'center'}}
          onSubmit={(e) => {
            e.preventDefault()
            setJoining(true)
          }}
        >
          <div>
            <label>Display Name</label>
            <input
              type="text"
              autoFocus={true}
              defaultValue={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value)
              }}
            />
          </div>
          <button
            style={{ marginTop: 8, width: 70 }}
            onClick={() => {
              setJoining(true)
            }}
          >
            Join
          </button>
        </form>
      </div>
    )
  }

  // If the room is live and host allows them in, render the Project component
  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {
          allow ? <Project /> : <>Waiting Room</>
        }
        <div>
          <DeviceSelection />
          <ControlPanel />
        </div>
      </div>
      <div>
        <Participants />
      </div>
    </div>
  )
}

// ** DON'T TOUCH **
const Student = () => {
    return (
        <StudioProvider>
            <GuestView />
        </StudioProvider>
    )
}

export default Student;