import React from 'react';
import './Textarea.css';

const Textarea = ({
  label,
  name,
  placeholder,
  error,
  register,
  required = false,
  rows = 5,
  ...props
}) => {
  return (
    <div className="textarea-wrapper">
      {label && (
        <label htmlFor={name} className="textarea-label">
          {label} {required && <span className="text-[--primary]">*</span>}
        </label>
      )}
      <textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        className={`textarea ${error ? 'textarea-error' : ''}`}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && <p className="textarea-error-message">{error.message}</p>}
    </div>
  );
};

export default Textarea;