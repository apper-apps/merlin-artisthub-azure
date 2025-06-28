import React from 'react';
import { NavLink } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const BottomNavigation = () => {
  const navItems = [
    {
      path: '/inquiries',
      icon: 'Mail',
      label: 'Inquiries',
      badge: 3
    },
    {
      path: '/profile',
      icon: 'User',
      label: 'Profile'
    },
    {
      path: '/notifications',
      icon: 'Bell',
      label: 'Notifications',
      badge: 5
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-2 py-2">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'text-primary-600 bg-primary-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }
              `}
            >
              <div className="relative">
                <ApperIcon name={item.icon} size={22} />
                {item.badge && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-error-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </div>
                )}
              </div>
              <span className="text-xs font-medium mt-1">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;