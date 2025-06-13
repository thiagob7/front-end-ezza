import React from "react";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { tv } from "tailwind-variants";

interface ModalTitleProps {
  text: string;
  variant?: "default" | "primary" | "danger" | "success";
}

const modalTitle = tv({
  slots: {
    base: "text-xl text-green-800 font-semibold flex items-center text-center gap-2",
    icon: "",
    text: "",
  },
  variants: {
    variant: {
      default: {
        icon: "hidden",
      },
      primary: {
        icon: "text-yellow-300",
      },
      danger: {
        icon: "text-red-400",
      },
      success: {
        icon: "text-green-300",
      },
    },
  },
});

const ICONS = {
  default: null,
  primary: <FaInfoCircle />,
  danger: <FaX />,
  success: <FaCheckCircle />,
} as const;

export const ModalTitle: React.FC<ModalTitleProps> = ({
  text,
  variant = "default",
}) => {
  const { base, icon, text: textClass } = modalTitle({ variant });
  const iconSymbol = ICONS[variant];

  return (
    <div>
      <h2 className={base()}>
        {iconSymbol && <span className={icon()}>{iconSymbol}</span>}
        <span className={textClass()}>{text}</span>
      </h2>
    </div>
  );
};
