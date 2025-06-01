import { AppBar, Toolbar, Typography } from "@mui/material"

const NavBar = () => {
  return (
    <AppBar 
      position="fixed"
      color="inherit"
      sx={{
        opacity: 0.8
      }}
    >
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
      </Toolbar>
    </AppBar>
  )
}
export default NavBar