import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    userId: '', username: '', dob: '', password: '',
    question1: '', answer1: '', question2: '', answer2: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({ userId: '', username: '', dob: '', password: '', question1: '', answer1: '', question2: '', answer2: '' });
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error connecting to server.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Register Account</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group"><label>User ID</label><input type="text" name="userId" value={formData.userId} onChange={handleChange} required /></div>
        <div className="form-group"><label>Full Name</label><input type="text" name="username" value={formData.username} onChange={handleChange} required /></div>
        <div className="form-group"><label>Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} required /></div>
        
        <div className="form-group">
          <label>Password</label>
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
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
        
        <div className="form-group">
          <label>Security Question 1</label>
          <select name="question1" value={formData.question1} onChange={handleChange} required style={{ marginBottom: '8px' }}>
            <option value="">Select a question</option>
            <option value="What is your pet's name?">What is your pet's name?</option>
            <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
            <option value="What was your first school?">What was your first school?</option>
          </select>
          <input type="text" name="answer1" placeholder="Your Answer" value={formData.answer1} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Security Question 2</label>
          <select name="question2" value={formData.question2} onChange={handleChange} required style={{ marginBottom: '8px' }}>
            <option value="">Select a question</option>
            <option value="What is your favorite food?">What is your favorite food?</option>
            <option value="In what city were you born?">In what city were you born?</option>
            <option value="What is your favorite movie?">What is your favorite movie?</option>
          </select>
          <input type="text" name="answer2" placeholder="Your Answer" value={formData.answer2} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn-primary" style={{ background: '#3b82f6' }}>Register</button>
      </form>
      <div className="link-container">
        <Link to="/" className="link-item" style={{ color: '#3b82f6' }}>Back to Login</Link>
      </div>
    </div>
  );
}

export default Register;