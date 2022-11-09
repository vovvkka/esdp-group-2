import React, {useState} from 'react';
import {Container, Grid, TextField, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";


const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const CashierOpenShift = () => {
    const [state, setState] = useState({
        pinKod: "",
    });
    const {classes} = useStyles();
    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const submitHandler = e => {
        e.preventDefault();
    };
        return (
            <Container maxWidth="xs" sx={{marginTop: '150px'}}>
                <Grid sx={{backgroundColor: "#d4d4bc", borderRadius: "5px", textAlign: 'center'}}>
                    <div className={classes.paper}>
                        <Grid item sx={{marginY: "10px"}}>
                            <Typography variant="h6"
                                        sx={{
                                            backgroundColor: '#ff9994',
                                            width: "350px",
                                            height: '50px',
                                            paddingTop: '10px'
                                        }}>
                                СМЕНА ЗАКРЫТА
                            </Typography>
                        </Grid>
                        <Grid item sx={{marginY: "10px", backgroundColor: "#32a3ff", padding: "20px"}}>
                            <Typography component="h1" variant="h6">ПИН КОД</Typography>
                            <TextField
                                type="password"
                                name="pinKod"
                                value={state.pinKod}
                                onChange={inputChangeHandler}
                                bg="white"
                                inputProps={{maxLength: 4}}
                                sx={{backgroundColor: 'white'}}
                            >
                            </TextField>
                        </Grid>
                        <Grid item sx={{marginY: "20px"}}>
                            <ButtonWithProgress sx={{
                                backgroundColor: '#4fbeff',
                                width: "200px"
                            }}
                                                variant="contained"
                                                color="inherit"
                                                onSubmit={submitHandler}>
                                Открыть смену
                            </ButtonWithProgress>
                        </Grid>
                    </div>
                </Grid>
            </Container>
        );
};

export default CashierOpenShift;