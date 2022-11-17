import {List, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Box} from "@mui/system";
import {Colors} from "../../theme";

export const AppbarContainer = styled(Box)(() => ({
    position: 'fixed',
    top: 0,
    left: 0,
    background: '#fff',
    zIndex: 1000,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 8px',
    borderBottom: '1px solid #B0B0B0FF',
}));

export const AppbarHeader = styled(Typography)(() => ({
    flexGrow: 1,
    fontSize: "4em",
    color: Colors.secondary,
}));

export const ActionIconsContainerMobile = styled(Box)(() => ({
    display: 'flex',
    background: Colors.shaft,
    position: "fixed",
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    zIndex: 99,
    borderTop: `1px solid ${Colors.border}`
}));

export const ActionIconsContainerDesktop = styled(Box)(() => ({
    flexGrow: 0,
}));

export const MyList = styled(List)(({type}) => ({
    display: type === "row" ? "flex" : "block",
    flexGrow: 3,
    justifyContent: "center",
    alignItems: "center",
}));