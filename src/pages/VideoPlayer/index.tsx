import {
  SelectChangeEvent,
  FormControl,
  MenuItem,
  Slider,
  Select,
  Box,
  Fab,
} from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import PauseIcon from '@mui/icons-material/Pause';
import React, { useState } from 'react';

import { playerProvider } from '../../providers/player-provider';
import VideoComponent from './VideoComponent';
import { videos } from './videoData';

export const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const onStateToggle = () => {
    isPlaying ? playerProvider.pause() : playerProvider.play();
    setIsPlaying(!isPlaying);
  };

  const onRewind = () => {
    playerProvider.rewind();
  };

  const onForward = () => {
    playerProvider.forward();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onTimeChange = (_: any, value: number[] | number) => {
    playerProvider.jump(value as number);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onVolumeChange = (_: any, value: number[] | number) => {
    playerProvider.volume(value as number);
  };

  const onSpeedChange = (event: SelectChangeEvent) => {
    playerProvider.speed(Number(event.target.value));
  };

  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          width: '744px',
          padding: '8px',
        }}
      >
        <Box
          sx={{
            gridTemplateColumns: '360px 360px',
            marginBottom: '8px',
            display: 'grid',
            gap: '8px',
          }}
        >
          {videos.map((video) => {
            return <VideoComponent key={video.sources} videoData={video} />;
          })}
        </Box>

        <Box
          sx={{
            backgroundColor: '#c0c0c0',
            alignItems: 'center',
            borderRadius: '8px',
            padding: '8px 8px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <Fab onClick={onRewind} color="primary" size="small">
            <FastRewindIcon fontSize="medium" />
          </Fab>
          <Fab onClick={onStateToggle} color="primary" size="small">
            {isPlaying ? (
              <PauseIcon fontSize="medium" />
            ) : (
              <PlayArrowIcon fontSize="medium" />
            )}
          </Fab>
          <Fab onClick={onForward} color="primary" size="small">
            <FastForwardIcon fontSize="medium" />
          </Fab>
          <Box
            sx={{
              alignItems: 'center',
              marginLeft: '10px',
              display: 'flex',
              width: '290px',
            }}
          >
            <Slider
              valueLabelDisplay="auto"
              onChange={onTimeChange}
              defaultValue={0}
              max={550}
              step={1}
              min={0}
            />
          </Box>
          <FormControl sx={{ minWidth: '70px' }} variant="standard">
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              onChange={onSpeedChange}
              defaultValue={'1'}
              label="Age"
            >
              <MenuItem value={2}>X2</MenuItem>
              <MenuItem value={1.75}>X1.75</MenuItem>
              <MenuItem value={1.5}>X1.5</MenuItem>
              <MenuItem value={1}>X1</MenuItem>
              <MenuItem value={0.5}>X0.5</MenuItem>
              <MenuItem value={0.25}>X0.25</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{
              alignItems: 'center',
              marginLeft: '10px',
              display: 'flex',
              gap: '12px',
            }}
          >
            <VolumeDown />
            <Slider
              onChange={onVolumeChange}
              valueLabelDisplay="auto"
              sx={{ width: '80px' }}
              defaultValue={100}
              max={100}
              step={1}
              min={0}
            />
            <VolumeUp />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
