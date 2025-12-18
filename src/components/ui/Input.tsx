
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  isTextArea?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  isTextArea = false, 
  className = '', 
  id,
  ...props 
}) => {
  const Component = isTextArea ? 'textarea' : 'input';
  const baseStyles = isTextArea ? 'form-textarea' : 'form-input';
  
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label font-semibold">
          {label}
        </label>
      )}
      <Component
        id={id}
        className={`${baseStyles} ${error ? 'border-error' : ''} ${className}`}
        {...(props as any)}
      />
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
};
