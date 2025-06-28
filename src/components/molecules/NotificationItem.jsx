import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import ApperIcon from '@/components/ApperIcon';

const NotificationItem = ({ notification, onMarkAsRead, onNavigate }) => {
  const getNotificationIcon = (type) => {
    const icons = {
      new_inquiry: 'Mail',
      status_update: 'CheckCircle',
      reminder: 'Clock'
    };
    return icons[type] || 'Bell';
  };

  const getNotificationText = (notification) => {
    switch (notification.type) {
      case 'new_inquiry':
        return `New inquiry from ${notification.clientName}`;
      case 'status_update':
        return `Inquiry status updated to ${notification.status}`;
      case 'reminder':
        return `Reminder: Follow up on inquiry from ${notification.clientName}`;
      default:
        return 'New notification';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`
        card p-4 cursor-pointer transition-all duration-200
${!notification.is_read ? 'border-l-4 border-l-primary-500 bg-primary-50/30' : ''}
      `}
      onClick={() => {
        onMarkAsRead(notification.Id);
        if (notification.inquiryId && onNavigate) {
          onNavigate(`/inquiries/${notification.inquiryId}`);
        }
      }}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center
${!notification.is_read ? 'bg-primary-100' : 'bg-gray-100'}
          `}>
            <ApperIcon 
              name={getNotificationIcon(notification.type)} 
              size={18} 
className={!notification.is_read ? 'text-primary-600' : 'text-gray-600'}
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
<p className={`text-sm ${!notification.is_read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                {notification.message}
              </p>
              {notification.eventType && (
                <p className="text-xs text-gray-500 mt-1">
                  Event: {notification.eventType}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
{!notification.is_read && (
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              )}
              <span className="text-xs text-gray-500">
{format(new Date(notification.created_at), 'h:mm a')}
              </span>
            </div>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
{format(new Date(notification.created_at), 'MMM d, yyyy')}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationItem;