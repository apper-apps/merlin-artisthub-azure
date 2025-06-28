import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg 
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-primary text-white shadow-lg shadow-primary-500/25 
      hover:shadow-xl hover:shadow-primary-500/30 focus:ring-primary-500
    `,
    secondary: `
      bg-white text-gray-700 border border-gray-200 
      hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-500
    `,
    accent: `
      bg-gradient-accent text-white shadow-lg shadow-accent-500/25 
      hover:shadow-xl hover:shadow-accent-500/30 focus:ring-accent-500
    `,
    success: `
      bg-gradient-success text-white shadow-lg shadow-success-500/25 
      hover:shadow-xl hover:shadow-success-500/30 focus:ring-success-500
    `,
    ghost: `
      text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500
    `
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const iconSize = {
    sm: 16,
    md: 18,
    lg: 20
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={iconSize[size]} 
          className="animate-spin mr-2" 
        />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSize[size]} 
          className={children ? 'mr-2' : ''} 
        />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSize[size]} 
          className={children ? 'ml-2' : ''} 
        />
      )}
    </motion.button>
  );
};

export default Button;