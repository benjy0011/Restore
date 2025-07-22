import type { HTMLAttributes, ReactNode } from "react";
import { useCompositeMenu } from "./useCompositeMenu";


interface Props {
  id?: string;
  children: ReactNode;
  style?: HTMLAttributes<HTMLDivElement>
}

export const CompositeMenuTrigger = ({
  id,
  children,
  style
}: Props) => { 
  const { setAnchor } = useCompositeMenu();

  return (
    <div
      id={id}
      onClick={(e) => setAnchor(e.currentTarget as HTMLElement)}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </div>
  );
}