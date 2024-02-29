import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { moviesGet } from '../../services/movieService';
import { MovieCard } from './MovieCard';
import { IMovieData } from './types';

export const MoviesTab = () => {
  const [movies, setMovies] = useState<IMovieData[] | null>(null);
  const [sortMovies, setSortMovies] = useState<IMovieData[] | []>([]);
  const [sort, setSort] = React.useState('0');

  const handleChange = (event: SelectChangeEvent) => {
    setSort(String(event.target.value));
  };

  useEffect(() => {
    if (sort === '0') {
      return;
    }
    sortMoviesFn(sort);
  }, [sort]);

  const sortMoviesFn = (sortBy: string) => {
    if (!movies) {
      return;
    }
    switch (sortBy) {
      case '1':
        setSortMovies([...movies].sort((a, b) => a.rating - b.rating));
        break;
      case '2':
        setSortMovies([...movies].sort((a, b) => b.rating - a.rating));
        break;
      case '3':
        setSortMovies([...movies].sort((a, b) => a.year - b.year));
        break;
      case '4':
        setSortMovies([...movies].sort((a, b) => b.year - a.year));
        break;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await moviesGet();
        setMovies(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <Box sx={{ width: '100%', mb: 2 }}>
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id="select-label">Sort By</InputLabel>
          <Select
            onChange={handleChange}
            labelId="select-label"
            label="Sort By"
            value={sort}
            id="select"
          >
            <MenuItem value={0}>NONE</MenuItem>
            <MenuItem value={1}>Rating Down</MenuItem>
            <MenuItem value={2}>Rating Up</MenuItem>
            <MenuItem value={3}>Year Down</MenuItem>
            <MenuItem value={4}>Year Up</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          gridTemplateColumns: '300px 300px 300px 300px',
          display: 'grid',
          gap: '16px',
        }}
      >
        {movies &&
          (sort === '0' ? movies : sortMovies).map((movie) => {
            return <MovieCard movieData={movie} key={movie.id} />;
          })}
      </Box>
    </>
  );
};
