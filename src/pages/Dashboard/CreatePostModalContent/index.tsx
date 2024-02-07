import {
  CircularProgress,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import React, { useState } from 'react';

import { editPost, addPost } from '../../../services/otherServices';
import { PostType, postsGet } from '../../../store/posts-slice';
import { useAppDispatch } from '../../../store';

type Props = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  postFoEdit: PostType | null;
};

export const CreatePostModalContent = ({ setOpenModal, postFoEdit }: Props) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(postFoEdit?.title || '');
  const [body, setBody] = useState(postFoEdit?.body || '');
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
      await addPost({ title, body });
      dispatch(postsGet());
      setIsLoading(false);
      setOpenModal(false);
    } catch (error) {
      setIsLoading(false);
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      setIsLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      await editPost({ data: { title, body }, id: postFoEdit?.id! });
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
        {postFoEdit ? 'Edit Post' : 'Add Post'}
      </Typography>
      <Typography
        sx={{ width: '60%' }}
        fontWeight={300}
        align="center"
        fontSize={16}
      >
        Please {postFoEdit ? 'edit' : 'enter'} the title and body
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
        onClick={postFoEdit ? handleEdit : handleAdd}
        disabled={!title || !body}
        variant="contained"
        color="primary"
      >
        {postFoEdit ? 'EDIT' : 'ADD'}
      </Button>
    </Box>
  );
};
