import {Box} from "@mui/material";
import {styled} from "@mui/material/styles";

export const BannerContainer = styled(Box)(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "30px 0px",
    background: "#e2f0ff",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
    },
    borderRadius: '10px',
}));

export const BannerContent = styled(Box)(() => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    maxWidth: 420,
    padding: "30px",
}));

export const BannerImage = styled("img")(({src, theme}) => ({
    src: `url(${src})`,
    width: "auto",
    height: "300px",
    [theme.breakpoints.down("md")]: {
        width: "350px",
    },
    [theme.breakpoints.down("sm")]: {
        width: "200px",
        height: "150px",
    },
}));