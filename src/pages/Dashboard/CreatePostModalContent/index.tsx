import {
  CircularProgress,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState } from 'react';
import axios from 'axios';

import { postsGet } from '../../../store/posts-slice';
import { useAppDispatch } from '../../../store';

type Props = { setOpenModal: React.Dispatch<React.SetStateAction<boolean>> };

export const CreatePostModalContent = ({ setOpenModal }: Props) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeUrl = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(value);
  };

  const handleChangeEmail = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setBody(value);
  };

  const handleAdd = async () => {
    try {
      setIsLoading(true);
      await axios({
        url: 'http://localhost:8000/posts',
        data: { title, body },
        method: 'POST',
      });
      dispatch(postsGet());
      setIsLoading(false);
      setOpenModal(false);
    } catch (error) {
      setIsLoading(false);
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '250px',
        paddingY: '24px',
        display: 'flex',
        width: '500px',
        gap: '24px',
      }}
    >
      <Typography fontWeight={500} fontSize={32}>
        Add Post
      </Typography>
      <Typography
        sx={{ width: '60%' }}
        fontWeight={300}
        align="center"
        fontSize={16}
      >
        Please enter the title and body
      </Typography>
      <TextField
        onChange={handleChangeUrl}
        sx={{ width: '75%' }}
        autoComplete="off"
        label="Title"
        value={title}
      ></TextField>
      <TextField
        onChange={handleChangeEmail}
        sx={{ width: '75%' }}
        autoComplete="off"
        label="Body"
        value={body}
        minRows={2}
        maxRows={2}
        multiline
      ></TextField>
      <Button
        endIcon={
          isLoading ? (
            <CircularProgress sx={{ color: 'white' }} size={20} />
          ) : (
            <AddCircleIcon />
          )
        }
        disabled={!title || !body}
        onClick={handleAdd}
        variant="contained"
        color="primary"
      >
        ADD
      </Button>
    </Box>
  );
};
