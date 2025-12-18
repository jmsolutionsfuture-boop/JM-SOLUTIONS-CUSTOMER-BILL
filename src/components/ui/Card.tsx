
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
          <div className="h-px bg-slate-100 w-full mt-4"></div>
        </div>
      )}
      {children}
    </div>
  );
};
