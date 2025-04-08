import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginService from '../services/loginService';

const Login: React.FC = () => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginService(mail, pass);
      localStorage.setItem('token', data.token);

      // הפניית המשתמש לעמוד לפי ה-role שהתקבל מהשרת
      if (data.role === "User") {
        navigate("/user-page");
      } else if (data.role === "Supplier") {
        navigate(`/supplier-page/${data.id}`);      }
    } catch (err: any) {
      setError(err.message || 'שגיאה לא מזוהה');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>התחברות</h2>

      <div>
        <label>אימייל</label>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>סיסמה</label>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
      </div>

      {error && <div>{error}</div>}

      <button type="submit">התחבר</button>
      <div className="register-link">
        <p>אין לך חשבון? <span onClick={() => navigate("/supplier-register")}>הירשם כאן</span></p>
      </div>
    </form>
  );
};

export default Login;
