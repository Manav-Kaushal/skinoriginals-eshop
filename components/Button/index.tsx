import { cls } from "@utils/helpers";
import { forwardRef, ReactNode } from "react";

interface ButtonInterface {
  children: ReactNode;
  type?: "submit" | "button";
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "small" | "normal" | "large";
  pill?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const classes = {
  base: "focus:outline-none transition ease-in-out duration-300",
  disabled: "opacity-50 cursor-not-allowed",
  pill: "rounded-full",
  size: {
    small: "px-2 py-1 text-sm",
    normal: "px-4 py-2",
    large: "px-8 py-3 text-lg",
  },
  variant: {
    primary:
      "inline-block bg-primary border border-transparent py-3 px-8 rounded-md font-medium text-white hover:bg-hover transition-200",
    secondary:
      "bg-gray-200 hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 text-gray-900 hover:text-white rounded-md",
    danger:
      "bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white",
    ghost: "",
  },
};

// eslint-disable-next-line react/display-name
export const Button = forwardRef(
  (
    {
      children,
      type = "button",
      className,
      variant = "primary",
      size = "normal",
      pill,
      onClick,
      disabled = false,
      ...props
    }: ButtonInterface,
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${pill && classes.pill}
                ${disabled && classes.disabled}
                ${className}
            `)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
);
