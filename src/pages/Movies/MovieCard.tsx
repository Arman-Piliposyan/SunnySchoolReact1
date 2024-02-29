import { Typography, Button, Rating, Box } from '@mui/material';
import React from 'react';

import { setSelectedMovie } from '../../store/movie-slice';
import { useAppDispatch } from '../../store';
import { IMovieData } from './types';

type Props = {
  movieData: IMovieData;
};

export const MovieCard = ({ movieData }: Props) => {
  const dispatch = useAppDispatch();

  const handleWatch = () => {
    dispatch(setSelectedMovie(movieData));
  };
  return (
    <Box
      sx={{
        backgroundColor: '#35374B',
        flexDirection: 'column',
        borderRadius: '12px',
        alignItems: 'center',
        height: '525px',
        display: 'flex',
        padding: '12px',
        width: '300px',
        gap: '6px',
      }}
    >
      <Typography fontWeight={500} color={'white'} fontSize={18}>
        {movieData.title}
      </Typography>
      <img style={{ height: '140px' }} src={movieData.imageUrl} />
      <Typography color={'white'} fontSize={12}>
        Country : {movieData.country} Year : {movieData.year}
      </Typography>
      <Typography
        sx={{ alignItems: 'center', display: 'flex' }}
        color={'white'}
        fontSize={12}
      >
        Rating : <Rating value={movieData.rating} name="read-only" readOnly />
      </Typography>
      <Typography color={'white'} fontSize={12}>
        Genres : {movieData.genres.join()}
      </Typography>
      <Typography color={'white'} fontSize={12}>
        Actors : {movieData.actors.join()}
      </Typography>
      <Typography color={'white'} fontSize={12}>
        Description : {movieData.description}
      </Typography>
      <Box
        sx={{
          justifyContent: 'flex-end',
          flexDirection: 'column',
          display: 'flex',
          flex: '1',
        }}
      >
        <Button
          onClick={handleWatch}
          variant="contained"
          color="primary"
          size="small"
        >
          Watch movie
        </Button>
      </Box>
    </Box>
  );
};
