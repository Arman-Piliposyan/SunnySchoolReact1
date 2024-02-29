import { Typography, Button, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React from 'react';

import {
  actorsOptionsData,
  genresOptionsData,
  ratingOptionsData,
} from './data';
import { MultiSelectController } from '../../components/MultiSelectController';
import { TextFieldController } from '../../components/TextFieldController';
import { addMoviePost } from '../../services/movieService';
import { AddMovieSchema } from './constants';
import { IAddMovieData } from './types';

export const AdminTab = () => {
  const { handleSubmit, control, reset } = useForm<IAddMovieData>({
    resolver: yupResolver(AddMovieSchema),
    mode: 'all',
  });

  const addMovie = async (data: IAddMovieData) => {
    try {
      await addMoviePost(data);
      reset();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography fontWeight={700} fontSize={32}>
        Admin Panel
      </Typography>
      <Box
        sx={{
          gridTemplateColumns: '350px 350px 350px',
          display: 'grid',
          gap: '16px',
        }}
      >
        <TextFieldController
          fieldName="title"
          control={control}
          label="Title*"
        />
        <TextFieldController
          control={control}
          fieldName="year"
          label="Year*"
          type="number"
        />
        <TextFieldController
          fieldName="country"
          control={control}
          label="Country*"
        />
        <MultiSelectController
          options={genresOptionsData}
          fieldName="genres"
          control={control}
          label="Genres"
          multiple
        />
        <MultiSelectController
          options={actorsOptionsData}
          fieldName="actors"
          control={control}
          label="Actors"
          multiple
        />
        <MultiSelectController
          options={ratingOptionsData}
          fieldName="rating"
          control={control}
          label="Rating"
          multiple
        />
        <TextFieldController
          fieldName="imageUrl"
          control={control}
          label="ImageUrl*"
        />

        <TextFieldController
          fieldName="videoUrl"
          control={control}
          label="VideoUrl*"
        />
        <TextFieldController
          fieldName="description"
          label="Description*"
          control={control}
          maxRows={3}
          multiline
        />
        <Button
          onClick={handleSubmit(addMovie)}
          variant="contained"
          color="primary"
          size="small"
        >
          Add Movie
        </Button>
      </Box>
    </Box>
  );
};
