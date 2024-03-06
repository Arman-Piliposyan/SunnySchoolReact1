import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { selfBoardProvider } from '../../../providers/game-providers/self-board-provider';
import { BoardEventTypes } from '../../../constants';

export const SelfBoard = () => {
  const [board, setBoard] = React.useState<number[][]>([]);

  useEffect(() => {
    return selfBoardProvider.eventEmitter.on(
      BoardEventTypes.ON_UPDATE,
      setBoard,
    );
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#00000050',
        border: '1px solid black',
        width: 'max-content',
        borderRadius: '8px',
        padding: '8px',
      }}
    >
      {board.map((row, i) => (
        <Box
          sx={{
            backgroundColor: '#FFFFFF',
            border: '1px solid black',
            display: 'flex',
          }}
          key={i}
        >
          {row.map((cell, j) => (
            <Box
              sx={{
                backgroundColor: '#FFFFFF',
                border: '1px solid black',
                height: '40px',
                width: '40px',
              }}
              key={j}
            ></Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
