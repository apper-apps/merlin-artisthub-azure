import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  fallback,
  className = '' 
}) => {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
    '2xl': 'w-20 h-20'
  };

  const iconSizes = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 40
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizes[size]} rounded-full object-cover bg-gray-200 ${className}`}
      />
    );
  }

  return (
    <div className={`
      ${sizes[size]} rounded-full bg-gradient-primary 
      flex items-center justify-center text-white font-medium ${className}
    `}>
      {fallback ? (
        <span className="text-sm">{fallback}</span>
      ) : (
        <ApperIcon name="User" size={iconSizes[size]} />
      )}
    </div>
  );
};

export default Avatar;