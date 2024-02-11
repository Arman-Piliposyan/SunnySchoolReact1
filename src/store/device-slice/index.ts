// deviceSlice.ts
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStateType } from '..';

interface DeviceState {
  devices: MediaDeviceInfo[];
}

const initialState: DeviceState = {
  devices: [],
};

const deviceSlice = createSlice({
  reducers: {
    setDevices: (state, action: PayloadAction<MediaDeviceInfo[]>) => {
      state.devices = action.payload;
    },
  },
  name: 'device',
  initialState,
});

export const { setDevices } = deviceSlice.actions;

export const selectDevices = (state: RootStateType) => state.device.devices;

export default deviceSlice.reducer;
