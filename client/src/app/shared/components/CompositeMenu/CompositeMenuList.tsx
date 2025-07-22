import type { ReactNode } from "react"
import { useCompositeMenu } from "./useCompositeMenu"
import { Menu, type MenuProps } from "@mui/material";

interface Props extends Omit<MenuProps, 'open' | 'anchorEl' | 'onClose'> {
  children: ReactNode,
}

export const CompositeMenuList = ({
  children,
  ...rest
}: Props) => {
  const { anchorEl, open, close } = useCompositeMenu();

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={close}
      slotProps={{ 
        list: { 'aria-labelledby': anchorEl?.id }
      }}
      {...rest}
    >
      {children}
    </Menu>
  )
}