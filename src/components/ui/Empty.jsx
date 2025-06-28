import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  icon = "Inbox",
  title = "No inquiries yet",
  description = "When clients submit event requests, they'll appear here.",
  actionLabel,
  onAction,
  className = ""
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 opacity-80">
        <ApperIcon name={icon} size={32} className="text-white" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{description}</p>
      
      {actionLabel && onAction && (
        <Button 
          variant="primary" 
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;