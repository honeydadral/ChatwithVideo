import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import Peer from 'simple-peer';

const VideoChat = () => {
  const webcamRef = useRef(null);
  const peerRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          webcamRef.current.srcObject = stream;

          // Create a new peer connection
          peerRef.current = new Peer({
            initiator: true,
            trickle: false,
            stream,
          });

          // Handle incoming stream from remote peer
          peerRef.current.on('stream', (remoteStream) => {
            // Handle the incoming stream from the remote user and display it on the screen
            // You can use another video element for this purpose.
          });
        })
        .catch((err) => {
          console.error('Error accessing the camera:', err);
        });
    } else {
      console.error('getUserMedia is not supported on this browser.');
    }
  }, []);

  return <Webcam ref={webcamRef} />;
};

export default VideoChat;
