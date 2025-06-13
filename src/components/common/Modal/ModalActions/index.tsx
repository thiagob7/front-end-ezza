import React, { ReactNode } from "react";

interface ModalActionsProps {
  children: ReactNode;
  align?: "left" | "center" | "right";
}

export const ModalActions: React.FC<ModalActionsProps> = ({
  children,
  align = "center",
}) => {
  return (
    <div
      style={{
        justifyContent: align,
      }}
      className="mt-6 flex gap-4 sticky "
    >
      {children}
    </div>
  );
};
