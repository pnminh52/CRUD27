import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../schema/user';
const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
     // Validate dữ liệu
     const { error } = userSchema.validate({ username, password }, { abortEarly: false });
    
     if (error) {
       setError(error.details[0].message);
       return;
     }
    onRegister({ username, password }); // Gửi dữ liệu đăng ký đến App.jsx
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Đăng ký</button>
      </form>
      <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
    </div>
  );
};

export default Register;