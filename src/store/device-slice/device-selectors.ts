import { createSelector } from '@reduxjs/toolkit';

import { RootStateType } from '..';

const devicesRootSelector = (state: RootStateType) => state.device;

export const devicesSelector = createSelector(
  devicesRootSelector,
  (devices) => devices.devices,
);
