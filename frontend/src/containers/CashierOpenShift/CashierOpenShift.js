import React, {useState} from 'react';
import {Alert, Container, Grid, TextField, Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import {useDispatch, useSelector} from "react-redux";
import {openShift} from "../../store/actions/shiftsActions";


const useStyles = makeStyles()(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const CashierOpenShift = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.shifts.error);
    const loading = useSelector(state => state.shifts.loading);
    const [state, setState] = useState({
        pin: "",
    });
    const {classes} = useStyles();
    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prev => ({...prev, [name]: value}));
    };

    const submitHandler = e => {
        e.preventDefault();
        dispatch(openShift(state));
    };
    return (
        <Container maxWidth="xs" sx={{marginTop: '150px'}}>
            <form>
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
                            {error && (
                                <Alert severity="error" className={classes.alert}>
                                    Error! {error.error}
                                </Alert>
                            )}

                            <TextField
                                type="password"
                                name="pin"
                                value={state.pin}
                                onChange={inputChangeHandler}
                                bg="white"
                                inputProps={{maxLength: 4}}
                                sx={{backgroundColor: 'white'}}
                            />
                        </Grid>

                        <Grid item sx={{marginY: "20px"}}>
                            <ButtonWithProgress
                                type='submit'
                                sx={{backgroundColor: '#4fbeff', width: "200px"}}
                                variant="contained"
                                color="inherit"
                                loading={loading}
                                onClick={submitHandler}
                            >
                                Открыть смену
                            </ButtonWithProgress>
                        </Grid>
                    </div>
                </Grid>
            </form>
        </Container>
    );
};

export default CashierOpenShift;