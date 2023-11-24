import React, { useState } from 'react';
import './Chatbot.css';
import useApi from '../hooks/useApi';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatbotVisible, setIsChatbotVisible] = useState(true);

  const api = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);

    try {
      setInput('');
      setLoading(true);
      const response = await api.getRecetteSearchAnswer({ message: input });

      const aiMessage = response.data.aiMessage;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiMessage, sender: 'chatbot' },
      ],);
    } catch (error) {
      console.error('Error calling API:', error);
    } finally {
      setLoading(false);
    }
    setInput('');
  };

  const closeChatbot = () => {
    setIsChatbotVisible(false);
  };

  return (
    <div className={`chatbot-container ${isChatbotVisible ? 'visible' : 'hidden'}`}>
      <div id="header">
        <h1>Coco le Cuisto</h1>
      </div>
      <div id="chatbot">
        <div id="conversation">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${message.sender}-message`}
            >
              <p className="chatbot-text">
                {message.text}
              </p>
            </div>
          ))}
        </div>
        <form id="input-form" onSubmit={handleSubmit}>
          <div className="message-container">
            <input
              id="input-field"
              type="text"
              placeholder="Votre message ..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="loader-container">
              {loading && <div className="loader"></div>}
            </div>
            <button id="submit-button" type="submit" disabled={loading}>
              <img className="send-icon" src="send-message.png" alt="" />
            </button>
            <button id="close-button" onClick={closeChatbot}>
              {/* Icône de croix (SVG par exemple) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
