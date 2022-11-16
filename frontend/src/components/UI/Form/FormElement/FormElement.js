import React from 'react';
import {Grid, TextField} from "@mui/material";

const FormElement = ({name, value, onChange, label, error, type, required, fullWidth, inputProps, width, xs, multiline,rows}) => {
    return (
        <Grid item xs={xs || 12}>
            <TextField
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
                inputProps={inputProps}
                multiline={multiline}
                rows={rows}
                fullWidth={fullWidth ? fullWidth : true}
            />
        </Grid>
    );
};

export default FormElement;