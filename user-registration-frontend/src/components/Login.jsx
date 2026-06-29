import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ userId: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        if (data.alert && data.alert !== 'none') alert(`ALERT: ${data.alert}`);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Welcome Back</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>User ID</label>
          <input type="text" name="userId" value={credentials.userId} onChange={handleChange} required placeholder="Enter your ID" />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              value={credentials.password} 
              onChange={handleChange} 
              required 
              placeholder="••••••••" 
              style={{ paddingRight: '45px' }} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '0'
              }}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#1a1a1a" style={{ width: '20px', height: '20px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644M7.543 6.134C10.425 4.88 13.574 4.88 16.457 6.134M21.964 11.678a1.012 1.012 0 010 .644M16.457 17.866c-2.883 1.254-6.032 1.254-8.914 0M12 15a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#a0aec0" style={{ width: '20px', height: '20px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <button type="submit" className="btn-primary" style={{ background: '#6366f1' }}>Sign In</button>
      </form>

      <div className="link-container">
        <Link to="/forgot-password" className="link-item" style={{ color: '#4f46e5' }}>Forgot Password?</Link>
        <Link to="/change-password" className="link-item" style={{ color: '#7c3aed' }}>Change Password</Link>
        <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '5px 0' }} />
        <Link to="/register" className="link-item" style={{ color: '#475569' }}>Create an account</Link>
      </div>
    </div>
  );
}

export default Login;