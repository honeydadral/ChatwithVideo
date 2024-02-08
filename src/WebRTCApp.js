import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

const WebRTCApp = () => {
  const videoRef = useRef(null);
  let peer;

  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    // Function to set up the WebRTC peer connection
    const setupWebRTC = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Initialize the WebRTC peer connection
          peer = new SimplePeer({
            initiator: true, // The sender will be the initiator of the connection
            stream: stream,
          });

          // Event listeners for handling WebRTC events
          peer.on('signal', (data) => {
            // Send the signaling data (SDP) to the receiver (you'll need to implement signaling)
            console.log('Signal data (SDP) to send to the receiver:', data);
          });

          peer.on('stream', (stream) => {
            // Handle the stream received from the receiver and display it
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          });
        }
      } catch (err) {
        console.error('Error accessing the camera:', err);
      }
    };

    if (isStreaming) {
      setupWebRTC();
    } else {
      // Clean up: Close the peer connection when streaming is stopped
      if (peer) {
        peer.destroy();
      }
    }

    return () => {
      // Clean up: Close the peer connection when the component unmounts
      if (peer) {
        peer.destroy();
      }
    };
  }, [isStreaming]);

  const handleStartStreaming = () => {
    setIsStreaming(true);
  };

  const handleStopStreaming = () => {
    setIsStreaming(false);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      {!isStreaming ? (
        <button onClick={handleStartStreaming}>Start Streaming</button>
      ) : (
        <button onClick={handleStopStreaming}>Stop Streaming</button>
      )}
    </div>
  );
};

export default WebRTCApp;
