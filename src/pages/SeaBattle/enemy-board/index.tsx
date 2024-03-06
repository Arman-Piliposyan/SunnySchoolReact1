import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { enemyBoardProvider } from '../../../providers/game-providers/enemy-board-provider';
import { gameProvider } from '../../../providers/game-providers/game-provider';
import { BoardEventTypes } from '../../../constants';

export const EnemyBoard = () => {
  const [board, setBoard] = React.useState<number[][]>([]);

  useEffect(() => {
    return enemyBoardProvider.eventEmitter.on(
      BoardEventTypes.ON_UPDATE,
      setBoard,
    );
  }, []);

  const onClick = (i: number, j: number) => {
    gameProvider.ask(i, j);
  };

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
              onClick={() => onClick(i, j)}
              key={j}
            ></Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
