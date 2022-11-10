import React, { useContext, useState, useRef, useEffect } from 'react';
import { Helpers } from '@api.stream/studio-kit';
import { FiSend } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import { ChatMessage } from './ChatMessage';

const { StudioContext } = Helpers.React

const ChatView = (props) => {
  const { chatHistory, selfId, showCloseIcon, onClose } = props;
  const { room } = useContext(StudioContext);
  const [draft, setDraft] = useState('');

  const scrollbox = useRef(null);

  /// get chat history in parent view
  /*useEffect(() => {
    if (!room) return;
    return room.useChatHistory((history) => {
      setChatHistory(history);
      scrollbox.current.scrollTo({
        top: scrollbox.current.scrollHeight,
      });
    });
  }, [room]);*/

  useEffect(() => {
    if (chatHistory.length > 0) {
      scrollbox.current.scrollTo({
        top: scrollbox.current.scrollHeight,
      });
    }
  }, [chatHistory]);

  const onSendMessage = () => {
    if (!draft.trim()) {
      return;
    }
    room.sendChatMessage({
      message: draft.trim(),
    })
    setDraft('');
  }

  const onKeyPressChat = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  }

  return (
    <div className="relative flex flex-col flex-1 justify-between bg-white rounded-[.5rem] shadow-[0_4px_4px_4px_rgba(0,0,0,.25)]">
      {showCloseIcon && (
        <MdOutlineClose
          className="absolute left-4 top-5 text-[1.8rem] cursor-pointer"
          onClick={onClose}
        />
      )}
      <h2 className="font-['Medium'] text-[1.5rem] text-center mt-4">Chat</h2>
      <div ref={scrollbox} width="inherit" className="flex flex-col flex-1 gap-[.5rem] overflow-auto px-[1.5rem] py-[1rem]">
        {chatHistory.length === 0 && (
          <div className="font-normal text-[1rem] text-center">
            Private chat between host and guests.
          </div>
        )}
        {chatHistory.map((chat, i) => {
          return <ChatMessage key={i} message={chat} isSelf={chat.sender === selfId} />
        })}
      </div>
      <div className="flex items-end justify-between shadow-[0_0_3px_1px_rgba(0,0,0,0.25)] rounded-b-[.5rem] gap-3 px-2">
        <textarea
          placeholder="Write a message..."
          rows={1}
          className="flex-1 font-normal text-[1rem] p-4 border-0 focus:outline-none resize-y overflow-hidden"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyPress={onKeyPressChat}
        />
        <button
          className="rounded-full bg-[#535353] p-3 mb-2 mr-2"
          onClick={onSendMessage}
        >
          <FiSend size={18} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default ChatView;
