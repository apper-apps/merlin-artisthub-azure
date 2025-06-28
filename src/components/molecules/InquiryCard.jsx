import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Badge from '@/components/atoms/Badge';
import Avatar from '@/components/atoms/Avatar';
import ApperIcon from '@/components/ApperIcon';

const InquiryCard = ({ inquiry }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const colors = {
      new: 'border-l-blue-500',
      seen: 'border-l-gray-400',
      responded: 'border-l-warning-500',
      confirmed: 'border-l-success-500'
    };
    return colors[status] || 'border-l-gray-400';
  };

const getEventTypeIcon = (eventType) => {
    const icons = {
      'wedding': 'Heart',
      'corporate': 'Building2',
      'birthday': 'Gift',
      'anniversary': 'Calendar',
      'graduation': 'GraduationCap',
      'festival': 'Music',
      'private': 'Users',
      'other': 'Star'
    };
    return icons[(eventType?.toLowerCase() ?? 'other')] || 'Calendar';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`
        card border-l-4 ${getStatusColor(inquiry.status)} p-4 cursor-pointer
        hover:shadow-md transition-all duration-200
      `}
      onClick={() => navigate(`/inquiries/${inquiry.Id}`)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
fallback={inquiry.Name?.charAt(0)} 
            size="md"
            size="md"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 truncate">
{inquiry.Name}
              </h3>
              <Badge variant={inquiry.status} size="sm">
                {inquiry.status}
              </Badge>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <ApperIcon 
                name={getEventTypeIcon(inquiry.eventType)} 
                size={14} 
                className="mr-1" 
              />
<span className="truncate">{inquiry.subject}</span>
              <span className="mx-2">•</span>
<span>{format(new Date(inquiry.created_at), 'MMM d, yyyy')}</span>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
{inquiry.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
Submitted {format(new Date(inquiry.created_at), 'MMM d, h:mm a')}
              </span>
              <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InquiryCard;