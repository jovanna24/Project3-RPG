
import './Profile.css'

import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER_PROFILE } from '../../utils/queries';

// import {CharacterComponent } from 'Client/src/components/CharacterComponent.jsx'// importing Character avatar from CharacterComponent.jsx
// the component needs to be put somewhere in the return section

const Profile = () => {
  const { profileId } = useParams();

  const { loading, data } = useQuery(GET_USER_PROFILE, { // changed query paramater - mustafa
    // pass URL parameter
    variables: { profileId: profileId },
  });

  const profile = data?.profile || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  // need to display if theyre a premiun user or not, plus name/user
  return (
    <div>
      <h2>
        {profile.name} is a premium user 

      </h2>
    </div>
  )
}

export default Profile
