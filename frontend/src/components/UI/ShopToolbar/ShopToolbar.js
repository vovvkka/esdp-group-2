import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";
import AppbarDesktop from "./AppbarDesktop";
import AppbarMobile from "./AppbarMobile";

const ShopToolbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
      <>
        {matches ? <AppbarMobile matches={matches}/> : <AppbarDesktop matches={matches}/>}
      </>
  );
};

export default ShopToolbar;
