"use client";
import React, { ReactNode } from "react";
import ReactModal, { Props } from "react-modal";

interface ModalRootProps extends Props {
  children: ReactNode;
}

export const ModalRoot: React.FC<ModalRootProps> = ({ children, ...rest }) => {
  return (
    <div>
      <ReactModal ariaHideApp={false} {...rest}>
        {children}
      </ReactModal>
    </div>
  );
};
