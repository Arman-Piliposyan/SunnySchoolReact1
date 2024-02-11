// DeviceSelectionComponent.tsx
import {
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';

interface DeviceSelectionComponentProps {
  onSelectDevice: (deviceId: string) => void;
  devices: MediaDeviceInfo[];
}

export const DeviceSelectionComponent: React.FC<
  DeviceSelectionComponentProps
> = ({ onSelectDevice, devices }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onSelectDevice(event.target.value);
  };

  return (
    <FormControl sx={{ width: '350px' }} size="small">
      <InputLabel id="demo-simple-select-label">Devices</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        onChange={handleChange}
        label="Devices"
      >
        {devices.map((device) => (
          <MenuItem value={device.deviceId} key={device.deviceId}>
            {device.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
