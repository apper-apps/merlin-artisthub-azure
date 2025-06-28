import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import InquiriesPage from '@/components/pages/InquiriesPage';
import InquiryDetailPage from '@/components/pages/InquiryDetailPage';
import ProfilePage from '@/components/pages/ProfilePage';
import NotificationsPage from '@/components/pages/NotificationsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<InquiriesPage />} />
            <Route path="/inquiries" element={<InquiriesPage />} />
            <Route path="/inquiries/:id" element={<InquiryDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;