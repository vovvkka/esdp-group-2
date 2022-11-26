import {Grid, List, ListItemText, Typography, useMediaQuery} from "@mui/material";
import {Box} from "@mui/system";
import theme, {Colors} from "../../theme";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import {FooterTitle} from "../../styles/Footer/styledFooter";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const Footer = () => {
    const location = useLocation();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const [isUser, setIsUser] = useState(true);


    useEffect(() => {
        if (location.pathname.includes('admin') || location.pathname.includes('cashier') || location.pathname.includes('login')) {
            setIsUser(false);
        } else {
            setIsUser(true);
        }
    }, [location.pathname]);

    return (
        isUser ? <Box
            sx={{
                width: '100%',
                height: 'auto',
                background: Colors.shaft,
                color: Colors.white,
                p: {xs: 4, md: 5},
                pt: 12,
                pb: 12,
                fontSize: {xs: '12px', md: '14px'},
                marginTop: 'auto'
            }}
        >
            <Grid container spacing={2} justifyContent="space-between" alignItems='flex-start'
                  sx={matches ? {marginBottom: '40px'} : null}>
                <Grid item sm={12} md={6}>
                    <FooterTitle variant="body1">О нас</FooterTitle>
                    <Typography variant="caption2">
                        Мы магазин одежды для новорожденных и будущих мам!<br/>У нас можно выгодно собраться в роддом,
                        приобрести вещи для детишек от 0 до 2 лет.
                        <br/>Тай-Тай в ожидании Чуда !
                    </Typography>
                    <Box
                        sx={{
                            mt: 4,
                        }}
                    >
                        <a href={'https://wa.me/996555911343'} rel="noreferrer" target="_blank">
                            <WhatsAppIcon sx={{mr: 1, color: Colors.dove_gray}}/>
                        </a>
                        <a href={'https://instagram.com/tay_tay_karakol?igshid=YmMyMTA2M2Y='} rel="noreferrer"
                           target="_blank">
                            <InstagramIcon sx={{color: Colors.dove_gray}}/>
                        </a>

                    </Box>
                </Grid>
                <Grid item sm={12} md={4}>
                    <FooterTitle variant="body1">Информация</FooterTitle>
                    <List>
                        <ListItemText>
                            <Typography component={Link} to='/about-us' lineHeight={2} variant="caption2"
                                        sx={{color: Colors.white, textDecoration: 'none', cursor: 'pointer'}}>
                                О нас
                            </Typography>
                        </ListItemText>
                        <ListItemText>
                            <Typography component={Link} to='/contacts' lineHeight={2} variant="caption2"
                                        sx={{color: Colors.white, textDecoration: 'none', cursor: 'pointer'}}>
                                Контакты
                            </Typography>
                        </ListItemText>
                    </List>
                </Grid>
            </Grid>
        </Box> : null
    );
};

export default Footer;
