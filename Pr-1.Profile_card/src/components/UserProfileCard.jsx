import React from 'react';
import './UserProfileCard.css';
import './fonts.css';

const UserProfileCard = (props) => {
  const { name, email, profilePicture, bio, phone, address } = props;

  return (
    <div className="user-profile-card">
      <img src={profilePicture} alt={`${name}'s profile`} className="profile-picture" />
      <div className="user-info">
        <h2 className="user-name">{name}</h2>
        <p className="user-data"><span>Email: </span>{email}</p>
        <p className="user-data"><span>Phone: </span>{phone}</p>
        <p className="user-data"><span>Address: </span>{address}</p>
        <p className="user-data"><span>Bio: </span>{bio}</p>
      </div>
    </div>
  );
};

export default UserProfileCard;