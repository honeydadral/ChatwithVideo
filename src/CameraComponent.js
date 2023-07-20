import React, { useState } from 'react';

const CameraComponent = () => {
  const [stream, setStream] = useState(null);

  const startCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log(mediaStream);
      setStream(mediaStream);
    } catch (error) {
      console.log('Error accessing media devices:', error);
    }
  };

  return (
    <div>
      <button onClick={startCapture}>Start Capture</button>
      {<video src={stream} autoPlay />}
    </div>
  );
};

export default CameraComponent;
