import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CommonDialog } from '../../components/UI_components/CommonDialog';
import { CommonModal } from '../../components/UI_components/CommonModal';
import { postsSelector } from '../../store/posts-slice/post-selectors';
import { CreatePostModalContent } from './CreatePostModalContent';
import { PostType, postsGet } from '../../store/posts-slice';
import { deletePost } from '../../services/otherServices';
import { useAppDispatch } from '../../store';
import { PostsTable } from './PostsTable';

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const posts = useSelector(postsSelector);

  const [openModal, setOpenModal] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [postForDelete, setPostForDelete] = useState<PostType | null>(null);
  const [postFoEdit, setPostForEdit] = useState<PostType | null>(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseDialog = () => {
    if (!isOpenDialog) {
      return;
    }
    setIsOpenDialog(false);
  };

  const handleDeletePost = async () => {
    if (!postForDelete?.id) {
      return;
    }
    try {
      await deletePost(postForDelete?.id);
      dispatch(postsGet());
      handleCloseDialog();
      setPostForDelete(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(postsGet());
  }, []);

  useEffect(() => {
    if (openModal) {
      return;
    }
    setPostForEdit(null);
  }, [openModal]);

  return (
    <>
      <Box
        sx={{
          flexDirection: 'column',
          display: 'flex',
          height: '100%',
          width: '100%',
          gap: '16px',
        }}
      >
        <Box
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
            width: '100%',
          }}
        >
          <Typography fontWeight={700} fontSize={32}>
            Posts
          </Typography>
          <Button
            endIcon={<AddCircleIcon />}
            onClick={handleOpenModal}
            variant="contained"
          >
            ADD POST
          </Button>
        </Box>
        {posts.length ? (
          <PostsTable
            setPostForDelete={setPostForDelete}
            setIsOpenDialog={setIsOpenDialog}
            setPostForEdit={setPostForEdit}
            setOpenModal={setOpenModal}
            posts={posts}
          />
        ) : (
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              height: '100%',
              width: '100%',
            }}
          >
            <Typography fontWeight={700} color={'grey'} fontSize={52}>
              Nothing To Show
            </Typography>
          </Box>
        )}
      </Box>
      <CommonModal
        modalContent={
          <CreatePostModalContent
            setOpenModal={setOpenModal}
            postFoEdit={postFoEdit}
          />
        }
        setOpenModal={setOpenModal}
        open={openModal}
      />
      {isOpenDialog && (
        <CommonDialog
          dialogContent={
            <Typography sx={{ wordWrap: ' break-word' }}>
              Are you sure you want to delete post - {postForDelete?.title}
            </Typography>
          }
          handleCloseDialog={handleCloseDialog}
          confirmAction={handleDeletePost}
          confirmIcon={<DeleteIcon />}
          isOpenDialog={isOpenDialog}
          dialogTitle="Delete Post"
          buttonColor="error"
          confirmText="Yes"
          cancelText="No"
        />
      )}
    </>
  );
};
