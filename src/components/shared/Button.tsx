import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button"
}: ButtonProps) {
  const baseStyles = "inline-block px-8 py-3.5 font-medium tracking-widest uppercase text-sm transition-all text-center";
  
  const variants = {
    primary: "border border-[#D4AF37] bg-[#D4AF37] text-zinc-900 hover:bg-white hover:border-white hover:text-zinc-900",
    secondary: "border border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800",
    outline: "border border-zinc-900 bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-white"
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}
