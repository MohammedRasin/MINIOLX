import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/userApi';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: data => {
      // Save token to localStorage
      localStorage.setItem('token', data.token);

      // Optionally save user info (without password)
      const { password, ...userData } = data.user;
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to products page
      navigate('/products');
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div
      style={{
        width: '350px',
        margin: '100px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Login</h2>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>
          {error.response?.data?.message || 'Login failed'}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Don't have an account?{' '}
        <Link
          to="/register"
          style={{
            color: '#4CAF50',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
