import {
  AppBar,
  Badge,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  styled,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  type ListItemProps,
} from "@mui/material";
import {
  Close,
  DarkMode,
  LightMode,
  Menu as MenuIcon,
  ShoppingCart,
} from "@mui/icons-material";
import { NavLink, type NavLinkProps } from "react-router-dom";
import React, { useState } from "react";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

type NavLinkListItemProps = Omit<ListItemProps, "component"> & NavLinkProps;

const NavLinkListItem = React.forwardRef<
  HTMLAnchorElement,
  NavLinkListItemProps
>((props, ref) => {
  return <ListItem {...props} component={NavLink} ref={ref} />;
});

const StyledNavLinkListItem = styled(NavLinkListItem)(({ theme }) => ({
  color: "inherit",
  ...theme.typography.h6,
  ["&:hover"]: {
    color: theme.palette.primary.light,
  },
  ["&.active"]: {
    color: theme.palette.primary.main,
  },
}));

// Mobile drawer list item styling
const MobileNavLinkListItem = styled(StyledNavLinkListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  justifyContent: "center",
  ["&:hover"]: {
    backgroundColor: theme.palette.action.hover,
  },
  ["&.active"]: {
    backgroundColor: theme.palette.action.selected,
  },
}));

interface Props {
  darkMode: boolean;
  handleToggleDarkMode: () => void;
}

const NavBar = ({ darkMode, handleToggleDarkMode }: Props) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileNavClick = (): void => {
    setMobileOpen(false);
  };

  // Title
  const title = (
    <Typography
      component={NavLink}
      to="/"
      variant="h6"
      sx={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      RE-STORE
    </Typography>
  );

  //  Light/Dark Mode Button
  const modeButton = (
    <IconButton onClick={handleToggleDarkMode}>
      {darkMode ? <DarkMode /> : <LightMode color={"warning"} />}
    </IconButton>
  );

  // Shopping Cart Button
  const shoppingCart = (
    <IconButton sx={{ color: "inherit" }}>
      <Badge badgeContent={1} color="primary">
        <ShoppingCart />
      </Badge>
    </IconButton>
  );

  // Mobile drawer content
  const drawer = (
    <Box
      role="presentation"
      sx={{
        width: 250,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6" component={"div"}>
          Menu
        </Typography>
        <IconButton onClick={handleMobileNavClick}>
          <Close />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {midLinks.map(({ title, path }) => (
          <MobileNavLinkListItem
            to={path}
            key={path}
            onClick={handleMobileNavClick}
          >
            {title.toUpperCase()}
          </MobileNavLinkListItem>
        ))}
      </List>

      <Divider />

      <List>
        {rightLinks.map(({ title, path }) => (
          <MobileNavLinkListItem
            to={path}
            key={path}
            onClick={handleMobileNavClick}
          >
            {title.toUpperCase()}
          </MobileNavLinkListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        sx={{
          opacity: 0.9,
        }}
      >
        <Toolbar>
          {isMobile ? (
            <Grid
              container
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid size={2}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge='start'
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              
              <Grid size={8} sx={{ textAlign: 'center' }}>
                {title}
              </Grid>
              

              <Grid size={2}>
                <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                {modeButton}
                {shoppingCart}
              </Box>
              </Grid>
              
            </Grid>
          ) : (
            // Desktop Layout
            <Grid container sx={{ width: "100%" }}>
              <Grid
                size={{ xs: 12, md: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {title}
                {modeButton}
              </Grid>

              <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <List sx={{ display: "flex", direction: "row" }}>
                  {midLinks.map(({ title, path }) => (
                    <StyledNavLinkListItem to={path} key={path}>
                      {title.toUpperCase()}
                    </StyledNavLinkListItem>
                  ))}
                </List>
              </Grid>

              <Grid
                size={{ xs: 12, md: 3 }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                {shoppingCart}
                <List
                  sx={{
                    display: "flex",
                    direction: "row",
                    alignItems: "center",
                  }}
                >
                  {rightLinks.map(({ title, path }) => (
                    <StyledNavLinkListItem to={path} key={path}>
                      {title.toUpperCase()}
                    </StyledNavLinkListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: null, md: "none" },
          ["& .MuiDrawer-paper"]: {
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
export default NavBar;
