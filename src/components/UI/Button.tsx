import React, { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  outline?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  outline = false,
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClass = outline ? `btn-outline-${variant}` : `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const stateClass = loading || disabled ? 'btn-disabled' : '';

  return (
    <button
      className={`
        ${baseClasses} 
        ${variantClass} 
        ${sizeClass} 
        ${stateClass} 
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner">⏳</span>}
      {icon && !loading && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;