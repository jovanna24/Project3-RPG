import React, { useState } from 'react';
import './AuthPopup.css';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, SIGNUP_USER } from '../../services/authService';

const AuthPopup = ({ closePopup }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [login, { loading: loginLoading, error: loginError }] = useMutation(LOGIN_USER);
  const [signup, { loading: signupLoading, error: signupError }] = useMutation(SIGNUP_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const { data } = await login({ variables: { email, password } });
        console.log('Login successful:', data);
        closePopup();
      } catch (err) {
        console.error('Login failed:', err);
      }
    } else {
      try {
        const { data } = await signup({ variables: { name, email, password } });
        console.log('Signup successful:', data);
        closePopup();
      } catch (err) {
        console.error('Signup failed:', err);
      }
    }
  };

  return (
    <div className="auth-popup">
      <div className="auth-popup-content">
        <span className="close" onClick={closePopup}>&times;</span>
        <form onSubmit={handleSubmit}>
          <h2>{isLogin ? 'Login' : 'Signup'}</h2>
          {!isLogin && (
            <div>
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        </form>
        {isLogin ? (
          <p>
            Don't have an account? <span onClick={() => setIsLogin(false)} className="toggle-form">Sign up here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setIsLogin(true)} className="toggle-form">Login here</span>
          </p>
        )}
        {loginLoading || signupLoading ? <p>Loading...</p> : null}
        {loginError && <p>Error: {loginError.message}</p>}
        {signupError && <p>Error: {signupError.message}</p>}
      </div>
    </div>
  );
};

export default AuthPopup;