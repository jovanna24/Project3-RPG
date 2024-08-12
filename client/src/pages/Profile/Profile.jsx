import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../utils/queries';
import './Profile.css';
import DefaultAvatar from '../../assets/User.svg';

const Profile = () => {
  // Fetch user data
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const user = data?.me || {};

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : 'N/A';  

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.avatar || DefaultAvatar} // Fallback for avatar
          alt={`${user.username}'s avatar`}
          className="profile-avatar"
        />
        <h2>Username: {user.username || 'Unknown User'}</h2>
      </div>
      <div className="profile-details">
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>Bio:</strong> {user.bio || 'Tell us about yourself!'}</p>
        <p><strong>Member Since:</strong> {memberSince}</p>
      </div>
    </div>
  );
};

export default Profile;
