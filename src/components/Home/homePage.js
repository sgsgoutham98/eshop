import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Your App</h1>
      <p>Please select an option to continue:</p>
      <div>
        <Link to="/login">Login as User</Link>
      </div>
      <div>
        <Link to="/admin/login">Login as Admin</Link>
      </div>
    </div>
  );
}

export default HomePage;
