import TableContainer from '@mui/material/TableContainer';
import React, { useEffect, useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Typography, Box } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

import { getPosts } from '../../services/otherServices';

type PostType = {
  userId: number;
  title: string;
  body: string;
  id: number;
};

export const Dashboard = () => {
  const [posts, setPosts] = useState<PostType[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getPosts();
        setPosts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, []);

  return (
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
      <Typography fontWeight={700} fontSize={32}>
        Posts
      </Typography>
      {posts && (
        <TableContainer sx={{ maxHeight: 550 }} component={Paper}>
          <Table
            sx={{ maxHeight: 550, minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Id</TableCell>
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
                    <TableCell component="th" scope="row">
                      {row.userId}
                    </TableCell>
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
  );
};
