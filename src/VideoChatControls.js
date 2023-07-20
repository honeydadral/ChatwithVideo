import React from 'react';
import { subscribeToChat, sendMessage } from './websocketService'; // Import the socket functions

const VideoChatControls = () => {
  // Implement video chat controls logic

  const handleSendMessage = () => {
    const message = 'Hello, world!'; // Replace with the actual message to send
    sendMessage(message); // Call the sendMessage function from the socket module
  };

  React.useEffect(() => {
    subscribeToChat((message) => {
      console.log('Received message:', message); // Replace with your desired logic for handling incoming messages
    });
  }, []);

  return (
    <div>
      <button onClick={handleSendMessage}>Send Message</button>
      <div>Video Chat Controls</div>
    </div>
  );
};

export default VideoChatControls;
