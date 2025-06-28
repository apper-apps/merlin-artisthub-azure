import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Avatar from '@/components/atoms/Avatar';
import StatusPicker from '@/components/molecules/StatusPicker';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { inquiryService } from '@/services/api/inquiryService';

const InquiryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  const loadInquiry = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await inquiryService.getById(parseInt(id));
      setInquiry(data);
    } catch (err) {
      setError('Failed to load inquiry details. Please try again.');
      console.error('Error loading inquiry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiry();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
const updatedInquiry = await inquiryService.update(inquiry.Id, {
        Name: inquiry.Name,
        subject: inquiry.subject,
        description: inquiry.description,
        status: newStatus,
        priority: inquiry.priority
      });
      setInquiry(updatedInquiry);
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
      console.error('Error updating status:', err);
    }
  };

  const handleCall = () => {
    window.location.href = `tel:${inquiry.clientPhone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${inquiry.clientEmail}`;
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
    return icons[eventType.toLowerCase()] || 'Calendar';
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadInquiry} />;
  if (!inquiry) return <Error message="Inquiry not found" onRetry={() => navigate('/inquiries')} />;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/inquiries')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
          Back to Inquiries
        </button>
      </div>

      <div className="space-y-6">
        {/* Client Info Card */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              <Avatar 
                fallback={inquiry.clientName?.charAt(0)} 
                size="lg"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
{inquiry.Name}
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={inquiry.status} size="md">
                    {inquiry.status}
                  </Badge>
                  <button
                    onClick={() => setShowStatusPicker(true)}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Mail" size={18} className="text-gray-400" />
<span className="text-gray-700">{inquiry.subject}</span>
            </div>
            <div className="flex items-center space-x-3">
              <ApperIcon name="Phone" size={18} className="text-gray-400" />
<span className="text-gray-700">{inquiry.description}</span>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button
              variant="primary"
              icon="Phone"
              onClick={handleCall}
              className="flex-1"
            >
              Call
            </Button>
            <Button
              variant="secondary"
              icon="Mail"
              onClick={handleEmail}
              className="flex-1"
            >
              Email
            </Button>
          </div>
        </div>

        {/* Event Details Card */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ApperIcon 
                name={getEventTypeIcon(inquiry.eventType)} 
                size={20} 
                className="text-primary-600" 
              />
              <div>
                <p className="font-medium text-gray-900">{inquiry.eventType}</p>
                <p className="text-sm text-gray-500">Event Type</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <ApperIcon name="Calendar" size={20} className="text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">
                  {format(new Date(inquiry.eventDate), 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-sm text-gray-500">Event Date</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <ApperIcon name="Clock" size={20} className="text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">
                  {format(new Date(inquiry.submittedAt), 'MMM d, yyyy at h:mm a')}
                </p>
                <p className="text-sm text-gray-500">Submitted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Card */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Message</h2>
          <p className="text-gray-700 leading-relaxed">{inquiry.message}</p>
        </div>

        {/* Notes Card */}
        {inquiry.artistNotes && (
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Notes</h2>
            <p className="text-gray-700 leading-relaxed">{inquiry.artistNotes}</p>
          </div>
        )}
      </div>

      <StatusPicker
        isOpen={showStatusPicker}
        onClose={() => setShowStatusPicker(false)}
        currentStatus={inquiry.status}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default InquiryDetailPage;