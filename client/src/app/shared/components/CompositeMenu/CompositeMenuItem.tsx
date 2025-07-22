import type { ReactNode } from "react";
import { useCompositeMenu } from "./useCompositeMenu";
import { MenuItem, type MenuItemProps } from "@mui/material";

interface Props extends Omit <MenuItemProps, 'onClick'> {
  onClick?: () => void;
  children: ReactNode;
}

export const CompositeMenuItem = ({
  onClick,
  children,
  ...rest
}: Props) => {
  const { close } = useCompositeMenu();

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <MenuItem onClick={handleClick} {...rest}>
      {children}
    </MenuItem>
  )
}