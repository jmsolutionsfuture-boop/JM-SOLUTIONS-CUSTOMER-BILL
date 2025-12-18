
import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ 
  label, 
  error, 
  options, 
  className = '', 
  id,
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="form-label font-semibold">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`form-select ${error ? 'border-error' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </div>
  );
};
