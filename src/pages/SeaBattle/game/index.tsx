import React, { useEffect } from 'react';
import { Box } from '@mui/material';

import { gameProvider } from '../../../providers/game-providers/game-provider';
import { EnemyBoard } from '../enemy-board';
import { SelfBoard } from '../self-board';

export const Game = () => {
  useEffect(() => {
    gameProvider.init();
  }, []);

  return (
    <Box sx={{ justifyContent: 'space-around', display: 'flex', gap: '24px' }}>
      <SelfBoard />
      <EnemyBoard />
    </Box>
  );
};
