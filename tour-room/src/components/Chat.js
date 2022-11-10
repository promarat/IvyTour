import { useContext, useEffect, useRef, useState } from 'react'
import { Helpers, SDK } from '@api.stream/studio-kit'
import { FiSend } from 'react-icons/fi';
import AVATAR from '../assets/images/avatar.png';

const { StudioContext } = Helpers.React

const displayTimeComponent = (component) =>
  component < 10 ? `0${component}` : String(component)

const displayTime = (time) =>
  `${time.getHours()}:${displayTimeComponent(
    time.getMinutes(),
  )}:${displayTimeComponent(time.getSeconds())}`

const ChatMessage = ({ message }) => {
  const sent = new Date(message.timestamp)
  return (
    <div>
      <span className="font-normal text-[15px] leading-[22px] text-[#444444]">{message.displayName}</span>
      <div className="flex gap-[9px]">
        <img src={AVATAR} alt="" className="w-[36px] h-[36px] rounded-[8px]" />
        <div className="flex flex-col bg-[#d9d9d9] rounded-[8px] px-2 pt-2 pb-1 gap-1">
          <p className="font-normal text-[15px] leading-[22px] text-black">{message.content}</p>
          <span className="font-normal text-[12px] leading-[16px] text-[#444444] text-right">{displayTime(sent)}</span>
        </div>
      </div>
    </div>
  )
}

export const Chat = () => {
  const { room } = useContext(StudioContext)
  const [chatHistory, setChatHistory] = useState([])
  const [draft, setDraft] = useState('')
  const scrollbox = useRef(null)

  useEffect(() => {
    if (!room) return
    return room.useChatHistory((history) => {
      const scrollY =
        scrollbox.current.scrollHeight - scrollbox.current.clientHeight
      setChatHistory(history)
      if (scrollbox.current.scrollTop === scrollY) {
        scrollbox.current.scrollTo({
          top: scrollbox.current.scrollHeight - scrollbox.current.clientHeight,
        })
      }
    })
  }, [room])

  const onSendMessage = () => {
    if (!draft.trim()) {
      return
    }
    room.sendChatMessage({
      message: draft.trim(),
    })
    setDraft('')
  }

  const onKeyPressChat = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden mx-2">
      <h2 className="font-semibold text-[25px] leading-[38px] text-center mt-2">Chat</h2>
      <div ref={scrollbox} width="inherit" className="flex flex-col gap-[8px] mx-[24px] my-[16px]">
        {chatHistory.length === 0 && (
          <div className="font-normal text-[15px] leading-[22px]">
            Private chat between host and guests.
          </div>
        )}
        {chatHistory.map((chat, i) => {
          return <ChatMessage key={i} message={chat} />
        })}
      </div>
      <div className="flex items-end justify-between shadow-[0_0_3px_1px_rgba(0,0,0,0.25)] gap-3">
        <textarea
          placeholder="Write a message..."
          rows={1}
          className="flex-1 font-normal text-[15px] leading-[22px] p-[24px] border-0 focus:outline-none resize-y overflow-hidden"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyPress={onKeyPressChat}
        />
        <button
          className="rounded-full bg-[#535353] p-3 mb-2 mr-2"
          onClick={onSendMessage}
        >
          <FiSend className="text-white text-[18px]" />
        </button>
      </div>
    </div>
  )
}