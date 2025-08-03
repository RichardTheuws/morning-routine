import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  children,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-500',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-md gap-2',
    md: 'px-4 py-2 text-base rounded-lg gap-2',
    lg: 'px-6 py-3 text-lg rounded-lg gap-3'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label={ariaLabel}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'lg' ? 20 : 16} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={size === 'lg' ? 20 : 16} />}
    </button>
  );
};