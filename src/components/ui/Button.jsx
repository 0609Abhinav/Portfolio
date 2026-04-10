import React from "react";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-neutral-400 hover:text-neutral-100 transition-colors duration-200",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-base px-6 py-3",
  lg: "text-lg px-8 py-4",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  as: Tag = "button",
  className = "",
  ...props
}) {
  const base = variants[variant] || variants.primary;
  const sizeClass = variant !== "ghost" ? sizes[size] : "";

  return (
    <Tag className={`${base} ${sizeClass} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
