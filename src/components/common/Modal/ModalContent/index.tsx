import React, { HTMLAttributes, ReactNode } from "react";

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  ...rest
}) => {
  return <div {...rest}>{children}</div>;
};
