import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { Player_Event_Types, PLAYER_STATES } from '../../constants';
import { playerProvider } from '../../providers/player-provider';
import { VideoDataType } from '../../types';

type Props = { videoData: VideoDataType };

const VideoComponent = ({ videoData }: Props) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stateChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.STATE_CHANGE,
      onStateChange,
    );

    const timeUpdateOff = playerProvider.eventEmitter.on(
      Player_Event_Types.TIME_UPDATE,
      onTimeUpdate,
    );

    const rewindOff = playerProvider.eventEmitter.on(
      Player_Event_Types.REWIND,
      onRewind,
    );

    const forwardOff = playerProvider.eventEmitter.on(
      Player_Event_Types.FORWARD,
      onForward,
    );

    const volumeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.VOLUME,
      onVolume,
    );

    const speedOff = playerProvider.eventEmitter.on(
      Player_Event_Types.SPEED,
      onSpeed,
    );

    return () => {
      speedOff();
      volumeOff();
      rewindOff();
      forwardOff();
      stateChangeOff();
      timeUpdateOff();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('waiting', onWaiting);
    }

    return () => {
      video?.removeEventListener('canplay', onCanPlay);
      video?.removeEventListener('waiting', onWaiting);
    };
  }, [videoRef.current]);

  const onStateChange = (state: number) => {
    switch (state) {
      case PLAYER_STATES.PLAYING: {
        videoRef.current?.play();
        break;
      }
      case PLAYER_STATES.PAUSED: {
        videoRef.current?.pause();
        break;
      }
    }
  };

  const onTimeUpdate = (time: number) => {
    videoRef.current && (videoRef.current.currentTime = time);
  };

  const onVolume = (volume: number) => {
    videoRef.current && (videoRef.current.volume = volume / 100);
  };

  const onSpeed = (speed: number) => {
    videoRef.current && (videoRef.current.playbackRate = speed);
  };

  const onRewind = () => {
    if (!videoRef.current || videoRef.current.currentTime < 11) {
      return;
    }
    videoRef.current.currentTime = videoRef.current.currentTime - 10;
  };

  const onForward = () => {
    videoRef.current &&
      (videoRef.current.currentTime = videoRef.current.currentTime + 10);
  };

  const onCanPlay = () => {
    playerProvider.removeBufferingItem(videoData.sources);
  };

  const onWaiting = () => {
    playerProvider.addBufferingItem(videoData.sources);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* {videoRef.current && (
        <span style={{ position: 'absolute', right: '4px', top: '4px' }}>
          {videoRef.current.currentTime || 0}
        </span>
      )} */}
      <video
        style={{ border: '1px solid #6d6d6d', borderRadius: '8px' }}
        src={videoData.sources}
        ref={videoRef}
        width={360}
      >
        {/* <source src={videoData.sources} /> */}
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};

export default VideoComponent;
