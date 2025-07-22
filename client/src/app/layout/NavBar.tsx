import {
  AppBar,
  Badge,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
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
import { Link, NavLink, type NavLinkProps } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setIsMobile, toggleDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";
import UserMenu from "./UserMenu";
import { useUserInfoQuery } from "../../features/account/accountApi";


const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const shoppingCartLink = "/basket";

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

// interface Props {
//   darkMode: boolean;
//   handleToggleDarkMode: () => void;
// }

const NavBar = () => {
  const {data: user} = useUserInfoQuery();

  const darkMode = useAppSelector(state => state.ui.darkMode);  
  const dispatch = useAppDispatch();

  const {data: basket} = useFetchBasketQuery();
  const itemCount = basket?.items.reduce((acc, curr) => acc + curr.quantity, 0) || 0;

  const handleToggleDarkMode = (): void => {
    dispatch(toggleDarkMode())
  }


  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { isLoading } = useAppSelector(state => state.ui);

  const handleSetIsMobile = useCallback((isMobile: boolean): void => {
    dispatch(setIsMobile(isMobile))
  }, [dispatch])

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileNavClick = (): void => {
    setMobileOpen(false);
  };

  useEffect(() => {
    handleSetIsMobile(isMobile)
  }, [isMobile, handleSetIsMobile])

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
    <IconButton 
      component={Link}
      to={shoppingCartLink}
      sx={{ color: "inherit" }}
    >
      <Badge badgeContent={itemCount} color="primary">
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


      {user ? (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            my: 2
          }}
        >
          <UserMenu 
            user={user} 
            size="large" 
            fontSize="large" 
            color="default"
          />
        </Box>
      )
      : (
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
      )}
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
              <Grid size={2.2}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>

              <Grid size={7.6} sx={{ textAlign: "center" }}>
                {title}
              </Grid>

              <Grid size={2.2}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "flex-end",
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
                {user ? (
                  <UserMenu user={user} />
                ) : (
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
                )}
              </Grid>
            </Grid>
          )}
        </Toolbar>
        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress color="primary" />
          </Box>
        )}
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
