import { Typography, Tooltip, Box, Fab } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useSelector } from 'react-redux';
import React from 'react';

import { movieSelector } from '../../store/movie-slice/movie-selectors';
import { setSelectedMovie } from '../../store/movie-slice';
import { useAppDispatch } from '../../store';

export const PlayerTab = () => {
  const dispatch = useAppDispatch();
  const selectedMovie = useSelector(movieSelector);

  const handleStopWatching = () => {
    dispatch(setSelectedMovie(null));
  };
  return (
    <Box
      sx={{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <Tooltip title="Stop Watching">
        <Fab
          sx={{ position: 'absolute', right: '0px', top: '0px' }}
          onClick={handleStopWatching}
          color="error"
          size="small"
        >
          <CancelIcon fontSize="medium" />
        </Fab>
      </Tooltip>
      <Box
        sx={{
          flexDirection: 'column',
          borderRadius: '12px',
          alignItems: 'center',
          display: 'flex',
          padding: '12px',
          width: '400px',
          gap: '6px',
        }}
      >
        <Typography fontWeight={500} color={'black'} fontSize={18}>
          {selectedMovie?.title}
        </Typography>
        <Typography color={'black'} fontSize={16}>
          Country : {selectedMovie?.country} Year : {selectedMovie?.year}
        </Typography>
        <Typography color={'black'} fontSize={16}>
          Genres : {selectedMovie?.genres.join()}
        </Typography>
        <Typography color={'black'} fontSize={16}>
          Actors : {selectedMovie?.actors.join()}
        </Typography>
        <Typography color={'black'} fontSize={16}>
          Description : {selectedMovie?.description}
        </Typography>
        <Box
          sx={{
            justifyContent: 'flex-end',
            flexDirection: 'column',
            display: 'flex',
            flex: '1',
          }}
        ></Box>
      </Box>
      <video
        style={{
          border: '1px solid #6d6d6d',
          height: 'max-content',
          borderRadius: '8px',
        }}
        src={selectedMovie?.videoUrl}
        width={720}
        controls
        autoPlay
      >
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};
