import React from 'react';
import {Grid, TextField} from "@mui/material";

const FormElement = ({name, value, onChange, label, error, type, required, fullWidth, InputProps, width, xs, multiline,rows, autoFocus}) => {
    return (
        <Grid item xs={xs || 12}>
            <TextField
                autoFocus={autoFocus ? autoFocus : false}
                sx={{marginY: "5px", width: {width}}}
                type={type}
                required={required}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={Boolean(error)}
                helperText={error}
                autoComplete={name}
                InputProps={InputProps}
                multiline={multiline}
                rows={rows}
                fullWidth={fullWidth ? fullWidth : true}
            />
        </Grid>
    );
};

export default FormElement;