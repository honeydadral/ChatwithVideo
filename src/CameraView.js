import React, { useState, useEffect, useRef } from 'react';

const CameraView = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef(null);
  let stream;

  useEffect(() => {
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraOn(true);
        }
      } catch (err) {
        console.error('Error accessing the camera:', err);
      }
    };

    const stopCamera = () => {
      if (stream) {
        const tracks = stream.getTracks() || [];
        tracks.forEach((track) => track.stop());
        setIsCameraOn(false);
      }
    };

    if (isCameraOn) {
      startCamera();
    }

    return () => {
      // Clean up: Stop the camera stream when the component unmounts
      stopCamera();
    };
  }, [isCameraOn]);

  const handleStartCamera = () => {
    setIsCameraOn(true);
  };

  const handleStopCamera = () => {
    setIsCameraOn(false);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      {!isCameraOn ? (
        <button onClick={handleStartCamera}>Start Video & Audio</button>
      ) : (
        <button onClick={handleStopCamera}>Stop Video & Audio</button>
      )}
    </div>
  );
};

export default CameraView;
