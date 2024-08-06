import React, { useState } from 'react';
import './AuthPopup.css';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../../services/authService';

const Signup = ({ closePopup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { data, loading, error }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup({ variables: { email, password } });
      console.log('Signup successful:', data);
      closePopup();
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="auth-popup">
      <div className="auth-popup-content">
        <span className="close" onClick={closePopup}>&times;</span>
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Signup</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default Signup;
