import TableContainer from '@mui/material/TableContainer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Typography, Button, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

import { CommonModal } from '../../components/UI_components/CommonModal';
import { postsSelector } from '../../store/posts-slice/post-selectors';
import { CreatePostModalContent } from './CreatePostModalContent';
import { postsGet } from '../../store/posts-slice';
import { useAppDispatch } from '../../store';

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const posts = useSelector(postsSelector);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(postsGet());
  }, []);

  return (
    <>
      <Box
        sx={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
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
        {posts && (
          <TableContainer
            sx={{ height: 'calc(100% - 50px)' }}
            component={Paper}
          >
            <Table
              sx={{ maxHeight: 550, minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }} align="center">
                    Title
                  </TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">
                    Body
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((row) => {
                  return (
                    <TableRow
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      key={row.id}
                    >
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.body}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <CommonModal
        modalContent={<CreatePostModalContent setOpenModal={setOpenModal} />}
        setOpenModal={setOpenModal}
        open={openModal}
      />
    </>
  );
};
