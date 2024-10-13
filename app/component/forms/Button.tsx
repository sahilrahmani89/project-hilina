import React from 'react';

interface ButtonProps {
  variant?: 'filled' | 'outlined';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean; 
  loading?: boolean; 
}

const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  children,
  onClick,
  className = '',
  disabled = false,
  loading = false,
}) => {
  const baseStyles = `py-2 px-4 rounded-md transition-colors duration-300 w-full ${className}`;
  const filledStyles = `bg-[#432918] text-white hover:bg-[#3a2518]`;
  const outlinedStyles = `border border-[#432918] text-[#432918] hover:bg-[#f9e136] hover:text-white`;

  const loadingStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      onClick={loading || disabled ? undefined : onClick} // Disable onClick if loading or disabled
      className={`${baseStyles} ${
        variant === 'filled' ? filledStyles : outlinedStyles
      } ${loading || disabled ? loadingStyles : ''}`}
      disabled={disabled} // Native disabled attribute
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
