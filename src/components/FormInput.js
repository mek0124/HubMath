import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function FormInput({ 
  icon, 
  type = 'text', 
  name, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  autoComplete = 'on',
  minLength,
  pattern,
  errorMessage
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleFocus = () => {
    setFocused(true);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  return (
    <div className="relative w-full mb-4">
      <div className="flex items-center">
        <div className="absolute left-3 text-accent">
          <FontAwesomeIcon icon={icon} />
        </div>
        
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          minLength={minLength}
          pattern={pattern}
          onBlur={handleFocus}
          data-focused={focused.toString()}
          className="w-full py-3 pl-10 pr-10 bg-primary bg-opacity-70 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-fontColor placeholder-fontColor placeholder-opacity-50 transition-all duration-300"
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 text-accent hover:text-fontColor transition-colors duration-300"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>
      
      {errorMessage && focused && (
        <span className="text-red-400 text-sm mt-1 ml-2 block animate-fadeIn">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
