import React, { useState, useEffect } from 'react';
import Avatar from '@/components/atoms/Avatar';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { artistService } from '@/services/api/artistService';

const ProfilePage = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await artistService.getById(1); // Assuming current artist ID is 1
      setArtist(data);
    } catch (err) {
      setError('Failed to load profile. Please try again.');
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProfile} />;
  if (!artist) return <Error message="Profile not found" onRetry={loadProfile} />;

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="card p-6 text-center">
          <Avatar 
            src={artist.profilePhoto}
            fallback={artist.name?.charAt(0)}
            size="2xl"
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{artist.name}</h1>
          <p className="text-gray-600 mb-4">{artist.bio}</p>
          
          <div className="flex justify-center space-x-2 mb-4">
            {artist.eventTypes?.map((type) => (
              <Badge key={type} variant="primary" size="sm">
                {type}
              </Badge>
            ))}
          </div>

          <Button variant="secondary" icon="Edit" className="w-full">
            Edit Profile
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Mail" size={24} className="text-primary-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">Total Inquiries</p>
          </div>

          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="CheckCircle" size={24} className="text-success-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Confirmed</p>
          </div>

          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="DollarSign" size={24} className="text-accent-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${artist.hourlyRate}</p>
            <p className="text-sm text-gray-600">Hourly Rate</p>
          </div>

          <div className="card p-4 text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Star" size={24} className="text-secondary-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">4.9</p>
            <p className="text-sm text-gray-600">Rating</p>
          </div>
        </div>

        {/* Availability Card */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
          <div className="space-y-3">
            {artist.availability && Object.entries(artist.availability).map(([day, available]) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">{day}</span>
                <Badge variant={available ? 'success' : 'error'} size="sm">
                  {available ? 'Available' : 'Unavailable'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button variant="secondary" icon="Settings" className="w-full">
            Account Settings
          </Button>
          <Button variant="secondary" icon="Bell" className="w-full">
            Notification Preferences
          </Button>
          <Button variant="secondary" icon="HelpCircle" className="w-full">
            Help & Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;