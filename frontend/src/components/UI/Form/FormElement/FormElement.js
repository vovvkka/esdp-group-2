import React from 'react';
import PropTypes from 'prop-types';
import {Grid, TextField} from "@mui/material";

const FormElement = ({name, value, onChange, label, error, type, required}) => {
  return (
    <Grid item xs={12}>
      <TextField
          sx={{marginY: "5px"}}
        type={type}
        required={required}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
        helperText={error}
        autoComplete={name}
      />
    </Grid>
  );
};

FormElement.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
};

export default FormElement;