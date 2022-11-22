import React from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const FormSelect = ({label, name, value, onChange, options, error, required, selectFromServer, xs}) => {
  return (
    <Grid item xs={xs || 12}>
      <FormControl fullWidth error={Boolean(error)}>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          required={required}
          labelId={`${name}-label`}
          fullWidth
          label={label}
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map(option => (
              !selectFromServer ?
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem> :
                  <MenuItem key={option._id} value={option._id}>
                      {option.title}
                  </MenuItem>
          ))}
        </Select>
        <FormHelperText>{ error }</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default FormSelect;