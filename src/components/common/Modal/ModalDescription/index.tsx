// Modal.Description.tsx
import React from "react";

interface ModalDescriptionProps {
  text: string;
}

export const ModalDescription: React.FC<ModalDescriptionProps> = ({ text }) => {
  return (
    <span className="whitespace-pre-line text-sm text-gray-380 font-light">
      {text}
    </span>
  );
};
