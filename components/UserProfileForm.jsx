import React, { useState } from 'react';

const UserProfileForm = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Add logic to update the user data (name, address, password) in your backend
    console.log('Updating user data:', { name, locality, city, country, password });
  };

  return (
    <div style={{ minWidth: '600px',maxWidth:'800px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' ,outline:'none',border:'0.2px solid blue',borderRadius:'5px'}}
          />
        </div>

        {/* Address */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="city" style={{ display: 'block', marginBottom: '5px' }}>City:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' ,outline:'none' ,border:'0.2px solid blue',borderRadius:'5px'}}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="country" style={{ display: 'block', marginBottom: '5px' }}>Country:</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box'  ,outline:'none',border:'0.2px solid blue',borderRadius:'5px'}}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Submit button */}
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfileForm;
