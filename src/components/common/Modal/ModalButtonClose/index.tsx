import React from "react";
import { FiX } from "react-icons/fi";

type ModalButtonCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ModalButtonClose: React.FC<ModalButtonCloseProps> = ({
  ...rest
}) => {
  return (
    <div>
      <button
        type="button"
        {...rest}
        className="flex items-center justify-center p-1 text-gray-950  rounded-md hover:bg-green-500 hover:text-gray-850 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      >
        <FiX size={24} />
      </button>
    </div>
  );
};
