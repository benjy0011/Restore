import { useContext } from "react";
import { CompositeMenuContext } from "./CompositeMenuContext";

export const useCompositeMenu = () => {
  const ctx = useContext(CompositeMenuContext);
  if (!ctx) throw new Error("Must be used within <CompositeMenu>");
  return ctx;
};