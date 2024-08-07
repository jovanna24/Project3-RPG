<<<<<<< HEAD
import './Profile.css'
=======
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE } from '../utils/queries';

import {CharacterComponent } from 'Client/src/components/CharacterComponent.jsx'// importing Character avatar from CharacterComponent.jsx
>>>>>>> ce38c143073cd5498ed5a09c687a8e2fea60cb03

const Profile = () => {
  const { profileId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
    // pass URL parameter
    variables: { profileId: profileId },
  });

  const profile = data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      
    </div>
  )
}

export default Profile
