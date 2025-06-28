import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const FilterModal = ({ 
  isOpen, 
  onClose, 
  filters, 
  onApplyFilters,
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const statuses = ['new', 'seen', 'responded', 'confirmed'];
  const eventTypes = ['Wedding', 'Corporate', 'Birthday', 'Anniversary', 'Graduation', 'Festival', 'Private', 'Other'];

  const handleStatusToggle = (status) => {
    setLocalFilters(prev => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter(s => s !== status)
        : [...prev.statuses, status]
    }));
  };

  const handleEventTypeToggle = (eventType) => {
    setLocalFilters(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.includes(eventType)
        ? prev.eventTypes.filter(t => t !== eventType)
        : [...prev.eventTypes, eventType]
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      statuses: [],
      eventTypes: [],
      dateRange: null
    };
    setLocalFilters(clearedFilters);
    onApplyFilters(clearedFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`bg-white rounded-t-2xl w-full max-w-md max-h-[80vh] overflow-y-auto ${className}`}
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Filter Inquiries</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ApperIcon name="X" size={20} className="text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Status</h4>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusToggle(status)}
                    className={`
                      px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                      ${localFilters.statuses.includes(status)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Badge variant={status} size="sm">
                      {status}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Event Type</h4>
              <div className="grid grid-cols-2 gap-2">
                {eventTypes.map((eventType) => (
                  <button
                    key={eventType}
                    onClick={() => handleEventTypeToggle(eventType)}
                    className={`
                      px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200
                      ${localFilters.eventTypes.includes(eventType)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    {eventType}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={handleClear}
                className="flex-1"
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                onClick={handleApply}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FilterModal;