import { useState } from 'react';
import { Link } from 'react-router-dom';

function ChangePassword() {
  const [passwordData, setPasswordData] = useState({
    userId: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    passwordChangeDate: '' // 1. Added date field to state
  });

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData), // The date is now automatically included here!
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // 2. Clear state on success, including the date
        setPasswordData({ userId: '', oldPassword: '', newPassword: '', confirmPassword: '', passwordChangeDate: '' });
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error changing password.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Change Password</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>User ID</label>
          <input type="text" name="userId" value={passwordData.userId} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Old Password</label>
          <input type="password" name="oldPassword" value={passwordData.oldPassword} onChange={handleChange} required placeholder="••••••••" />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handleChange} required placeholder="••••••••" />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handleChange} required placeholder="••••••••" />
        </div>

        {/* 3. Added Password Change Date input box field */}
        <div className="form-group">
          <label>Password Change Date</label>
          <input 
            type="date" 
            name="passwordChangeDate" 
            value={passwordData.passwordChangeDate} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="btn-primary" style={{ background: '#7c3aed' }}>
          Update Password
        </button>
      </form>

      <div className="link-container">
        <Link to="/" className="link-item" style={{ color: '#3b82f6' }}>Back to Login</Link>
      </div>
    </div>
  );
}

export default ChangePassword;