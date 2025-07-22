import { createContext } from "react";

export type ContextType = {
  anchorEl: HTMLElement | null;
  open: boolean;
  setAnchor: (el: HTMLElement | null) => void;
  close: () => void;
}

export const CompositeMenuContext = createContext<ContextType | undefined>(undefined);