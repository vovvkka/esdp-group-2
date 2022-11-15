import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {Box, Button, Container, Grid, Link, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import TableAdmin from "../../components/UI/Table/Table";
import {getCashiers} from "../../store/actions/cashiersActions";

const Cashiers = () => {
    const cashiers = useSelector(state => state.cashiers.cashiers);
    const loading = useSelector(state => state.categories.loading);
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const rowsHead = ['Кассир', 'Действие'];

    useEffect(() => {
        dispatch(getCashiers());
    }, [dispatch]);

    if (user?.role !== 'admin') {
        return <Redirect to="/"/>;
    }

    return (
        <Container>
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Кассиры</Typography>
                <Button variant='contained' component={Link} to='/admin/cashiers/add-new-cashiers'>Добавить</Button>
            </Grid>
            {loading ? <Spinner/>:
                <Box>
                    {cashiers?.length > 0 ? <TableAdmin rowsHead={rowsHead} rows={cashiers} cashiers='Кассиры' />: <Typography variant='h6'>Cashiers not found</Typography>}
                </Box>
            }
        </Container>
    );
};

export default Cashiers;