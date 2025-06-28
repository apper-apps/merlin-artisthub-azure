import React from 'react';

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const baseClasses = `
    inline-flex items-center font-medium rounded-full
  `;

  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'bg-accent-100 text-accent-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    new: 'bg-blue-100 text-blue-800',
    seen: 'bg-gray-100 text-gray-600',
    responded: 'bg-warning-100 text-warning-800',
    confirmed: 'bg-success-100 text-success-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;