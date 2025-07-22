import { 
  useState,
  type ReactNode,
} from "react";
import { CompositeMenuContext } from "./CompositeMenuContext";


interface Props {
  children: ReactNode;
  onExpansionChange?: (expanded: boolean) => void;
}


export const CompositeMenu = ({
  children,
}: Props) => {
  const [ anchorEl, setAnchorEl ] = useState<HTMLElement | null>(null);
  const open = !!anchorEl;

  const close = () => setAnchorEl(null);

  return (
    <CompositeMenuContext.Provider
      value={{
        anchorEl,
        open,
        setAnchor: setAnchorEl,
        close,
      }}
    >
      {children}
    </CompositeMenuContext.Provider>
  )
}