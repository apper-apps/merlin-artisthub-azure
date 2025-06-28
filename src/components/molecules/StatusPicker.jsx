import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const StatusPicker = ({ 
  isOpen, 
  onClose, 
  currentStatus, 
  onStatusChange,
  className = '' 
}) => {
  const statuses = [
    { value: 'new', label: 'New', description: 'Inquiry not yet reviewed' },
    { value: 'seen', label: 'Seen', description: 'Inquiry has been viewed' },
    { value: 'responded', label: 'Responded', description: 'Response sent to client' },
    { value: 'confirmed', label: 'Confirmed', description: 'Booking confirmed' }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`bg-white rounded-t-2xl w-full max-w-md p-6 ${className}`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Update Status</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} className="text-gray-500" />
            </button>
          </div>
          
          <div className="space-y-3">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => {
                  onStatusChange(status.value);
                  onClose();
                }}
                className={`
                  w-full p-4 rounded-lg border text-left transition-all duration-200
                  hover:bg-gray-50 hover:border-gray-300
                  ${currentStatus === status.value 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">{status.label}</span>
                  <Badge variant={status.value} size="sm">
                    {status.label}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{status.description}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StatusPicker;