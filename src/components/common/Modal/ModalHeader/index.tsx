import React, { ReactNode } from "react";

interface ModalHeaderProps {
  children: ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => {
  return (
    <div className="flex justify-between items-center sticky w-full z-100">
      {children}
    </div>
  );
};
