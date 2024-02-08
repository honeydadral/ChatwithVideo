import React, { useState, useEffect } from 'react';
import { subscribeToChat } from './websocketService';
import CameraComponent from './CameraComponent';
import VideoChatComponent from './VideoChatComponent';
import CameraView from './CameraView';
import VideoChat from './VideoChat';
import PeerConnection from './PeerConnection';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleReceivedMessage = () => {
    setMessages((prevMessages) => [...prevMessages, inputText]);
  };

  const handleSendMessage = () => {
    setMessages((prevMessages) => [...prevMessages, inputText]);
    // sendMessage(inputText);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    subscribeToChat(handleReceivedMessage);
  }, []);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="chat-interface">
      <div className="message-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown} // Add the keydown event listener here
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div className="video-chat-container">
        <h1>Chat Interface</h1>
        <CameraView />
        <PeerConnection />
        {/*<VideoChat />3
      <VideoChatComponent />*/}
        
        {/* Add other components or content as needed */}
      </div>
    </div>
  );
};

export default ChatInterface;
