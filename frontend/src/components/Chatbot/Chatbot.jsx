import React, { useState, useRef, useEffect } from "react"
import { MdChat } from "react-icons/md"
import "./Chatbot.css"

const Chatbot = () => {
  const [isActive, setIsActive] = useState(false)
  const [messages, setMessages] = useState([])
  const inputRef = useRef(null)

  const toggleState = () => {
    setIsActive(!isActive)
  }

  // Automatically scroll to the newest message
  useEffect(() => {
    const chatMessages = document.querySelector(".chatbox__messages")
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight
    }
  }, [messages])

  return (
    <div className="">
      <div className="chatbox">
        <div
          className={`chatbox__support ${isActive ? "chatbox--active" : ""}`}
        >
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              {/* Direct link to the image; ensure you have rights to use it or replace it with your own */}
              <img
                src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                alt="Support"
              />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">Chat support</h4>
              <p className="chatbox__description--header">
                Hi. My name is Sam. How can I help you?
              </p>
            </div>
          </div>
          <div className="chatbox__messages">
            {/* Messages will be dynamically inserted here */}
          </div>
          <div className="chatbox__footer">
            <input type="text" placeholder="Write a message..." />
            <button className="chatbox__send--footer send__button">Send</button>
          </div>
        </div>
        <div className="chatbox__button" onClick={toggleState}>
          {" "}
          {/* Attach the onClick event handler here */}
          {/* Ensure you provide a valid path for your button image or use an SVG/react-icon */}
          <button>
            <MdChat size="34px" color="#007bff" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
