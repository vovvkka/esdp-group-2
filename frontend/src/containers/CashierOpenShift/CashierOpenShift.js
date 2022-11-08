import React, {useState} from 'react';
import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";

const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        color: "white",
    },
}));

const CashierOpenShift = () => {
    const [state, setState] = useState({
        pinKod: "",
    });
    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    };
    const {classes} = useStyles();
    return (
        <Container maxWidth="xs">
            <Grid sx={{backgroundColor: "#d4d4bc", borderRadius: "5px"}}>
            <div className={classes.paper}>
            <Grid item sx={{marginY: "10px"}}>
                <Button  color="inherit" variant="contained" sx={{backgroundColor: '#ff9994', width: "300px"}}>Смена закрыта</Button>
            </Grid>
            <Grid item sx={{marginY: "10px"}}>
                <Typography component="h1" variant="h6" sx={{textAlign:"center"}}>ПИН КОД</Typography>
                <TextField type="password"
                           name="pinKod"
                           value={state.pinKod}
                           onChange={inputChangeHandler}
                           sx={{width: "300px", height: "50px"}}>

                </TextField>
            </Grid>
            <Grid item sx={{marginY: "20px"}}>
                <Button sx={{backgroundColor: '#4fbeff', width: "200px"}} variant="contained" color="inherit">Открыть смену </Button>
            </Grid>
            </div>
            </Grid>
        </Container>
    );
};

export default CashierOpenShift;