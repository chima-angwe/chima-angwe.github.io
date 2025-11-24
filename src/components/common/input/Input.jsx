import React from 'react';
import './Input.css';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  register,
  required = false,
  ...props
}) => {
  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={name} className="input-label">
          {label} {required && <span className="text-[--primary]">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className={`input ${error ? 'input-error' : ''}`}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && <p className="input-error-message">{error.message}</p>}
    </div>
  );
};

export default Input;