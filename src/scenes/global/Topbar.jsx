import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <>
    <div className="color">
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        // backgroundColor={colors.primary[400]}
        backgroundColor='#F3F2EE'
        borderRadius="3px"
        borderColor='red'
        border= '1px solid #CFCFCA'
      >
        
        <InputBase sx={{ ml: 2, flex: 1, color: '#CFCFCA' }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1, color: '#CFCFCA' }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode} sx={{ color: '#555555' }} >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton sx={{ color: '#555555' }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: '#555555' }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: '#555555' }}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
    <div className="vl"></div>
    </div>
    </>
  );
};

export default Topbar;
