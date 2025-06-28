import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  title = "Oops!",
  className = ""
}) => {
  return (
    <div className={`max-w-md mx-auto px-4 py-12 text-center ${className}`}>
      <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="AlertCircle" size={32} className="text-error-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{message}</p>
      
      {onRetry && (
        <Button 
          variant="primary" 
          onClick={onRetry}
          icon="RefreshCw"
        >
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;