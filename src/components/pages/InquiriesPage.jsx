import React from 'react';
import InquiryList from '@/components/organisms/InquiryList';

const InquiriesPage = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Inquiries</h2>
        <p className="text-gray-600">Manage and respond to event booking requests</p>
      </div>
      
      <InquiryList />
    </div>
  );
};

export default InquiriesPage;