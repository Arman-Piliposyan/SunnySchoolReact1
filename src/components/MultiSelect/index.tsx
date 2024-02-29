import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';

import { MenuProps } from '../../pages/Movies/constants';
import { OptionType } from '../../pages/Movies/types';

interface Props {
  options: OptionType[];
}

export const MultiSelect = ({ options }: Props) => {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 350 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          renderValue={(selected) => selected.join(', ')}
          labelId="demo-multiple-checkbox-label"
          input={<OutlinedInput label="Tag" />}
          id="demo-multiple-checkbox"
          onChange={handleChange}
          sx={{ width: '350px' }}
          MenuProps={MenuProps}
          value={personName}
          multiple
        >
          {options.map(({ value, label }) => (
            <MenuItem value={value} key={value}>
              <Checkbox checked={personName.indexOf(value) > -1} />
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
