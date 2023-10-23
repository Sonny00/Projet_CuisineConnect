import React, { useState } from 'react';
import './Chatbot.css';
import useApi from '../hooks/useApi';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add user input to messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);

    // Call the API to get a response
    try {
      setLoading(true);
      const response = await api.getRecetteSearchAnswer({ message: input });

      // Extract the AI message from the API response
      const aiMessage = response.data.aiMessage;

      // Add the AI message to the messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiMessage, sender: 'chatbot' },
      ]);
    } catch (error) {
      console.error('Error calling API:', error);
    } finally {
      setLoading(false);
    }

    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div id="header">
        <h1>Chatbot</h1>
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
            <button id="submit-button" type="submit" disabled={loading}>
              <img className="send-icon" src="send-message.png" alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
