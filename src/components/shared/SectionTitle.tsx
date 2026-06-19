import React from "react";

interface SectionTitleProps {
  label?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  centered?: boolean;
  className?: string;
  dark?: boolean;
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  centered = false,
  className = "",
  dark = false,
}: SectionTitleProps) {
  return (
    <div className={`${centered ? "text-center mx-auto" : ""} max-w-3xl mb-12 lg:mb-16 ${className}`}>
      {label && (
        <span className={`text-sm font-semibold tracking-widest uppercase mb-4 block ${dark ? "text-[#D4AF37]" : "text-[#D4AF37]"}`}>
          {label}
        </span>
      )}
      <h2 className={`text-4xl sm:text-5xl font-serif font-medium mb-6 ${dark ? "text-white" : "text-zinc-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg font-light ${dark ? "text-[#F5F5DC]" : "text-zinc-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
