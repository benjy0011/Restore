import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { DarkMode, LightMode } from '@mui/icons-material';

interface Props {
  darkMode: boolean
  handleToggleDarkMode: () => void
}

const NavBar = ({
  darkMode,
  handleToggleDarkMode,
}: Props) => {

  return (
    <AppBar 
      position="fixed"
      color="inherit"
      sx={{
        opacity: 0.9
      }}
    >
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <Box
          display={"flex"}
          justifyContent={"flex-end"}
          alignItems={"center"}
          flex={1}
        >
          <IconButton onClick={handleToggleDarkMode}>
            {darkMode ? <DarkMode /> : <LightMode color={"warning"} />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar