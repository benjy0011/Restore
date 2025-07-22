import { Divider, IconButton, ListItemIcon, ListItemText, Tooltip, type IconButtonProps, type IconProps } from "@mui/material";
import { CompositeMenu, CompositeMenuItem, CompositeMenuList, CompositeMenuTrigger, useCompositeMenu } from "../shared/components/CompositeMenu";
import { AccountCircleOutlined, History, Logout, Person } from "@mui/icons-material";
import type { User } from "../models/user";
import { useLogoutMutation } from "../../features/account/accountApi";


interface Props {
  user: User
  size?: IconButtonProps['size']
  fontSize?: IconProps['fontSize']
  color?: IconButtonProps['color']
}

const UserMenu = (props: Props) => (
  <CompositeMenu>
    <UserMenuContent 
      {...props}
    />
  </CompositeMenu>
)

const UserMenuContent = ({
  user,
  size = "medium",
  fontSize = "medium",
  color = "inherit",
}: Props) => {
  const [ logout ] = useLogoutMutation();

  const { open } = useCompositeMenu();

  return (
    <>
      <CompositeMenuTrigger>
        <Tooltip title={user.email}>
          <IconButton
            size={size}
            color={open ? "primary" : color}
          >
            <AccountCircleOutlined 
              fontSize={fontSize}
            />
          </IconButton>
        </Tooltip>
        
      </CompositeMenuTrigger>

      <CompositeMenuList>

        {/* My Profile */}
        <CompositeMenuItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>My profile</ListItemText>
        </CompositeMenuItem>

        {/* My Orders */}
        <CompositeMenuItem>
          <ListItemIcon>
            <History />
          </ListItemIcon>
          <ListItemText>My orders</ListItemText>
        </CompositeMenuItem>

        <Divider />

        {/* Logout */}
        <CompositeMenuItem onClick={logout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </CompositeMenuItem>

      </CompositeMenuList>
    </>
  )
}

export default UserMenu;