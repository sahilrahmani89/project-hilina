import React, { useState } from 'react';
import { IconEye , IconEyeOff} from '@tabler/icons-react';

interface InputProps {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  isDark?: boolean; // Optional isDark prop to control dark mode
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  name,
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  isDark = false // Default is false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-4 relative">
      {label && (
        <label htmlFor={name} className={`block text-sm font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isDark ? 'bg-tourDark text-white' : 'bg-white text-tourDark'
          }`}
          required={required}
        />
        {(type === 'password' && value.length>0) && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute inset-y-0 right-3 flex items-center  focus:outline-none`}
          >
            {showPassword ?  (
             <IconEye
              className={`w-[20px] h-[20px] ${isDark ?'text-white':'text-tourDark'}`}
             />
            
            ) : (
              <IconEyeOff
              className={`w-[20px] h-[20px] ${isDark ?'text-white':'text-tourDark'}`}
              />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-red text-xs mt-2">{error}</p>}
    </div>
  );
};

export default Input;