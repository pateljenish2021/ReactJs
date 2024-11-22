import React from 'react';
import './UserProfileCard.css';

const UserProfileCard = (props) => {
  const { name, email, profilePicture } = props;

  return (
    <div className="user-profile-card">
      <img src={profilePicture} alt={`${name}'s profile`} className="profile-picture" />
      <div className="user-info">
        <h2 className="user-name">{name}</h2>
        <p className="user-email">{email}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;