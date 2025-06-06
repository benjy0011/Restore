import { AppBar, Grid, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { DarkMode, LightMode } from '@mui/icons-material';
import { NavLink } from "react-router-dom";

const midLinks = [
  {title: 'catalog', path: '/catalog'},
  {title: 'about', path: '/about'},
  {title: 'contact', path: '/contact'},
]

const rightLinks = [
  {title: 'login', path: '/login'},
  {title: 'register', path: '/register'},
]

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
      position="sticky"
      color="inherit"
      sx={{
        opacity: 0.9
      }}
    >
      <Toolbar>

        <Grid container sx={{ width: "100%" }}>

          <Grid 
            size={{ xs: 12, md: 3 }}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 2
            }}  
          >
            <Typography variant="h6">RE-STORE</Typography>
            <IconButton onClick={handleToggleDarkMode}>
              {darkMode ? <DarkMode /> : <LightMode color={"warning"} />}
            </IconButton>
          </Grid>


          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }} 
          >
            <List sx={{ display: 'flex', direction: 'row' }}>
              {midLinks.map(({title, path}) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={{ color: 'inherit', typography: 'h6' }}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          </Grid>


          <Grid 
            size={{ xs: 12, md: 3 }} 
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
            }}
          >
            <List sx={{ display: 'flex', direction: 'row' }}>
              {rightLinks.map(({title, path}) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={{ color: 'inherit', typography: 'h6' }}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List> 
          </Grid>

        </Grid>


        
        

      </Toolbar>
    </AppBar>
  )
}
export default NavBar