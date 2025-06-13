/* eslint-disable react/display-name */
import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { buttonVariant, ButtonVariantProps } from "./variant";

interface ButtonProps
  extends ButtonVariantProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: React.MouseEventHandler;
  variant?: "default" | "disabled" | "light" | "white" | "edit" | "danger";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", className, disabled, ...rest }, ref) => {
    const appliedVariant = disabled ? "disabled" : variant;

    return (
      <button
        ref={ref}
        disabled={disabled}
        {...rest}
        className={buttonVariant({
          variant: appliedVariant,
          className,
        })}
      />
    );
  }
);
