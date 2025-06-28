import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import { AuthContext } from '@/App';

const Header = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
      case '/inquiries':
        return 'Inquiries';
      case '/profile':
        return 'Profile';
      case '/notifications':
        return 'Notifications';
      default:
        if (location.pathname.startsWith('/inquiries/')) {
          return 'Inquiry Details';
        }
        return 'ArtistHub Pro';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Palette" size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
          </div>
<div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ApperIcon name="Search" size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <ApperIcon name="Bell" size={20} className="text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full"></div>
            </button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
};

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  
  return (
    <button 
      onClick={logout}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      title="Logout"
    >
      <ApperIcon name="LogOut" size={20} className="text-gray-600" />
    </button>
  );
};

export default Header;