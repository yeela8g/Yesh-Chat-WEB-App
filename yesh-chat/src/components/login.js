import '../styles/login.css';
import React, { useState, useEffect } from 'react';

export const Login = ({ isLoggedIn, handleLogin }) => {

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin(formData);
    setFormData({ username: '', password: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  
  useEffect(() => {
    if (isLoggedIn) {
        window.location.href = "/chats";
    }
}, [isLoggedIn]);

  return (
    <>
      <img id="logo" src="logo.png" alt="logo"></img>
      <form onSubmit={handleSubmit}>
        <div className="card text-center border-dark" id="login">
          <div className="card-header">
            <h5>Login</h5>
          </div>
          <div className="card-body">
            <div>
              <h5 className="card-title">Username: <input type="text" name="username" value={formData.username} onChange={handleChange}/></h5>
            </div>
            <h5 className="card-text">Password: <input type="password" name="password" value={formData.password} onChange={handleChange}/></h5>
            <button type="submit" className="btn custom-btn">Log-in</button>
          </div>
          <div className="card-footer text-body-secondary">
            <span>
              Not registered?
              <a href="./register"> Click here </a>
              to register
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
