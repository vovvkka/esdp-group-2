import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner";
import TableAdmin from "../../components/UI/Table/Table";
import {getCashiers} from "../../store/actions/cashiersActions";

const AdminCashiers = () => {
    const cashiers = useSelector(state => state.cashiers.cashiers);
    const loading = useSelector(state => state.cashiers.loading);
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const rowsHead = ['№','Кассир','Логин','Дата','Действие'];

    useEffect(() => {
        dispatch(getCashiers());
    }, [dispatch]);

    if (user?.role !== 'admin') {
        return <Redirect to="/"/>;
    }

    return (
        <Container>
            <Grid display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='h5'>Кассиры</Typography>
                <Button variant='contained' component={Link} to='/admin/cashiers/add-new-cashier'>Добавить</Button>
            </Grid>
            {loading ? <Spinner admin/>:
                <Box>
                    {cashiers?.length > 0 ? <TableAdmin rowsHead={rowsHead} rows={cashiers} cashiers='Кассиры' />: <Typography variant='h6'>Cashiers not found</Typography>}
                </Box>
            }
        </Container>
    );
};

export default AdminCashiers;