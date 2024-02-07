import TableContainer from '@mui/material/TableContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import React from 'react';

import { PostType } from '../../../store/posts-slice';

const showIconStyles = {
  '&:hover': {
    color: '#1976d2',
  },
  cursor: 'pointer',
};

const deleteIconStyles = {
  '&:hover': {
    color: 'red',
  },
  cursor: 'pointer',
};

type Props = {
  setPostForDelete: React.Dispatch<React.SetStateAction<PostType | null>>;
  setPostForEdit: React.Dispatch<React.SetStateAction<PostType | null>>;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  posts: PostType[];
};

export const PostsTable = ({
  setPostForDelete,
  setIsOpenDialog,
  setPostForEdit,
  setOpenModal,
  posts,
}: Props) => {
  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };
  const handleOpenDeleteDialog = (row: PostType) => {
    handleOpenDialog();
    setPostForDelete(row);
  };

  const handleOpenEditModal = (row: PostType) => {
    setOpenModal(true);
    setPostForEdit(row);
  };

  return (
    <TableContainer sx={{ maxHeight: 'calc(100% - 50px)' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: '#1976d2' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }} align="left">
              Title
            </TableCell>
            <TableCell sx={{ color: 'white' }} align="left">
              Body
            </TableCell>
            <TableCell sx={{ color: 'white' }} align="center">
              Actions
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
                <TableCell width={400}>{row.title}</TableCell>
                <TableCell>{row.body}</TableCell>
                <TableCell
                  sx={{ padding: '8px', width: '150px' }}
                  align="center"
                >
                  <Tooltip title="Edit">
                    <IconButton
                      sx={{
                        marginRight: '16px',
                        height: '18px',
                        width: '18px',
                      }}
                      onClick={() => {
                        handleOpenEditModal(row);
                      }}
                      disableRipple
                    >
                      <EditIcon sx={showIconStyles} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      sx={{
                        height: '18px',
                        width: '18px',
                      }}
                      onClick={() => {
                        handleOpenDeleteDialog(row);
                      }}
                      disableRipple
                    >
                      <DeleteIcon sx={deleteIconStyles} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
