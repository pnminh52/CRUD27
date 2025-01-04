import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../schema/user';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
     // Validate dữ liệu
     const { error } = userSchema.validate({ username, password }, { abortEarly: false });
    
     if (error) {
       setError(error.details[0].message);
       return;
     }
    onLogin({ username, password }); // Gửi dữ liệu đăng nhập đến App.jsx
  };

  return (
    <div>
      <form onSubmit={handleSubmit }>
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
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <a href="/register">Đăng ký</a></p>
    </div>
  );
};

export default Login;