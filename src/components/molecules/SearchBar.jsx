import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = "Search inquiries...", 
  onFilterClick,
  hasActiveFilters = false,
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <ApperIcon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-lg 
                   focus:border-primary-500 focus:ring-2 focus:ring-primary-100 
                   transition-colors duration-200"
        />
        {onFilterClick && (
          <button
            onClick={onFilterClick}
            className={`
              absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md
              transition-colors duration-200
              ${hasActiveFilters 
                ? 'text-primary-600 bg-primary-50' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
              }
            `}
          >
            <ApperIcon name="Filter" size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;