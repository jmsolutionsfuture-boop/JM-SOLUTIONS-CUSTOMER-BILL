
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'btn';
  const variantStyles = `btn-${variant}`;
  const sizeStyles = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'px-8 py-3 text-lg' : '';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
