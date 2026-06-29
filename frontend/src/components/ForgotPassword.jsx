import { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [userId, setUserId] = useState('');
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({ answer1: '', answer2: '' });

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/forgot-password/questions/${userId}`);
      const data = await response.json();
      if (response.ok) {
        setQuestions(data);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error fetching security questions.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/forgot-password/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...answers }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Your password is: ${data.password}`);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error verifying answers.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Forgot Password</h2>
      {!questions ? (
        <div>
          <div className="form-group">
            <label>Enter User ID</label>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="e.g., john_doe" />
          </div>
          <button type="button" onClick={fetchQuestions} className="btn-primary" style={{ background: '#17a2b8' }}>
            Fetch Questions
          </button>
        </div>
      ) : (
        <form onSubmit={handleVerify}>
          <div className="form-group">
            <label style={{ color: '#1a1a1a', marginBottom: '12px' }}><strong>Q1:</strong> {questions.question1}</label>
            <input type="text" placeholder="Your Answer" required onChange={(e) => setAnswers({ ...answers, answer1: e.target.value })} />
          </div>
          <div className="form-group">
            <label style={{ color: '#1a1a1a', marginBottom: '12px' }}><strong>Q2:</strong> {questions.question2}</label>
            <input type="text" placeholder="Your Answer" required onChange={(e) => setAnswers({ ...answers, answer2: e.target.value })} />
          </div>
          <button type="submit" className="btn-primary" style={{ background: '#ef4444' }}>
            Reveal Password
          </button>
        </form>
      )}

      <div className="link-container">
        <Link to="/" className="link-item" style={{ color: '#3b82f6' }}>Back to Login</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;