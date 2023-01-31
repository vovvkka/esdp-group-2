import React from 'react';
import {FormControl, FormHelperText, Grid, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

const FormSelect = ({label, name, value, onChange, options, error, required, selectFromServer, xs, customerSelect}) => {
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
          {options.map(option => {
              if (selectFromServer) {
                  return  <MenuItem key={option._id} value={option._id}>{option.title}</MenuItem>
              }

              if (customerSelect) {
                  return <MenuItem key={option._id} value={option}>{option.name + " " + option.surname}</MenuItem>
              }

              return <MenuItem key={option} value={option}>{option}</MenuItem>
          })}
        </Select>
        <FormHelperText>{ error }</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default FormSelect;