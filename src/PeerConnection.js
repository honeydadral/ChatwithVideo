// src/PeerConnection.js
import React, { useEffect, useRef } from "react";
import SimplePeer from "simple-peer";

const PeerConnection = () => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  let localStream, peer;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStream = stream;
        localVideoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing media devices:", err));
  }, []);

  const startPeerConnection = () => {
    peer = new SimplePeer({
      initiator: true,
      stream: localStream,
    });

    peer.on("signal", (data) => {
      // Send the signal data to the other user through your preferred communication channel (e.g., WebSockets, socket.io, etc.)
      // The other user will have to share this signal data to initiate the connection.
      console.log("Send this data to the other user:", JSON.stringify(data));
    });

    peer.on("stream", (stream) => {
      // Display the remote user's video stream
      remoteVideoRef.current.srcObject = stream;
    });
  };

  const connectToPeer = (signalData) => {
    peer = new SimplePeer({
      initiator: false,
      stream: localStream,
    });

    peer.on("signal", (data) => {
      // Send this signal data back to the initiator (first user)
      console.log("Send this data back to the initiator:", JSON.stringify(data));
    });

    peer.on("stream", (stream) => {
      // Display the remote user's video stream
      remoteVideoRef.current.srcObject = stream;
    });

    // Provide the signal data received from the initiator to establish the connection.
    peer.signal(signalData);
  };

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted playsInline></video>
      <video ref={remoteVideoRef} autoPlay playsInline></video>
      <button onClick={startPeerConnection}>Start Peer Connection</button>
    </div>
  );
};

export default PeerConnection;
