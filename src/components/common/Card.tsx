import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  onClick, 
  hover = false 
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-slate-200';
  const hoverClasses = hover ? 'hover:shadow-md hover:border-slate-300 transition-all duration-200' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};