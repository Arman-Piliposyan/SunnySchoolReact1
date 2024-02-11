import { useDispatch, useSelector } from 'react-redux';
// App.tsx
import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';

import { devicesSelector } from '../../store/device-slice/device-selectors';
import { getMediaDevices, getMediaStream } from './MediaStreamManager';
import { DeviceSelectionComponent } from './DeviceSelectionComponent';
import { setDevices } from '../../store/device-slice';
import StreamComponent from './StreamComponent';

export const Stream: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const devices = useSelector(devicesSelector);
  const dispatch = useDispatch();

  const handleDeviceChange = async (deviceId: string) => {
    const newStream = await getMediaStream(deviceId);
    setStream(newStream);
  };

  useEffect(() => {
    const fetchDevices = async () => {
      const availableDevices = await getMediaDevices();
      dispatch(setDevices(availableDevices));
    };
    fetchDevices();
  }, [dispatch]);

  return (
    <Box
      sx={{
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
        width: '100%',
        gap: '16px',
      }}
    >
      <Typography fontWeight={700} fontSize={32}>
        Media Stream
      </Typography>
      <DeviceSelectionComponent
        onSelectDevice={handleDeviceChange}
        devices={devices}
      />
      <StreamComponent stream={stream} />
    </Box>
  );
};
