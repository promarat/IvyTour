import { useEffect, useState } from 'react'
import { Helpers, SDK } from '@api.stream/studio-kit'

const { useStudio, useDevices } = Helpers.React

export const DeviceSelection = () => {
  const { webcamId, microphoneId, setWebcamId, setMicrophoneId } = useStudio()
  const devices = useDevices()

  useEffect(() => {
    if (!webcamId) setWebcamId(devices.webcams[0]?.deviceId)
  }, [webcamId, devices])

  useEffect(() => {
    if (!microphoneId) setMicrophoneId(devices.microphones[0]?.deviceId)
  }, [microphoneId, devices])

  return (
    <div>
      <div>
        <label>Webcam</label>
        <select
          style={{width: "200px"}}
          value={webcamId}
          onChange={(e) => {
            setWebcamId(e.target.value)
          }}
        >
          {devices.webcams.map((x) => (
            <option key={x.deviceId} value={x.deviceId}>
              {x.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Microphone</label>
        <select
          style={{width: "200px"}}
          value={microphoneId}
          onChange={(e) => {
            setMicrophoneId(e.target.value)
            Helpers.Room.getUserMedia({audio: true}).then(res => console.log(res))
          }}
        >
          {devices.microphones.map((x) => (
            <option key={x.deviceId} value={x.deviceId}>
              {x.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export const ControlPanel = () => {
  const { room, projectCommands } = useStudio()
  const [isSharingScreen, setIsSharingScreen] = useState(false)
  const [participant, setParticipant] = useState()

  // Listen for room participants
  useEffect(() => {
    if (!room) return
    return room.useParticipant(room.participantId, setParticipant)
  }, [room])

  useEffect(() => {
    if (!participant) return
    const screenshare = participant.trackIds.find(
      (x) => room.getTrack(x)?.type === 'screen_share',
    )
    if (!screenshare) {
      projectCommands.removeParticipant(room.participantId, 'screen')
    }
    setIsSharingScreen(Boolean(screenshare))
  }, [participant?.trackIds])

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            const muted = e.target.checked
            room.setMicrophoneEnabled(!muted)
          }}
        />
        Mute microphone
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) => {
            const hidden = e.target.checked
            room.setCameraEnabled(!hidden)
          }}
        />
        Hide webcam
      </label>
      <label>
        <input
          type="checkbox"
          checked={isSharingScreen}
          onChange={(e) => {
            const enabled = e.target.checked
            if (enabled) {
              room.addScreen()
            } else {
              room.getParticipant(room.participantId).trackIds.forEach((x) => {
                if (room.getTrack(x).type === 'screen_share') {
                  room.removeTrack(x)
                }
              })
            }
          }}
        />
        Screenshare
      </label>
    </div>
  )
}

