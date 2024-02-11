// StreamComponent.tsx
import React, { useEffect, useRef } from 'react';

interface StreamComponentProps {
  stream: MediaStream | null;
}

const StreamComponent: React.FC<StreamComponentProps> = ({ stream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video
      style={{
        border: '1px solid rgba(66, 165, 245, 0.59)',
        boxShadow: ' 0 4px 30px rgba(0, 0, 0, 0.1)',
        background: 'rgba(66, 165, 245, 0.41)',
        backdropFilter: 'blur(5.4px)',
        borderRadius: '16px',
        height: '75%',
      }}
      ref={videoRef}
      autoPlay
    />
  );
};

export default StreamComponent;
