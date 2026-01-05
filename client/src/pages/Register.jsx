import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: data => {
      alert('User registered successfully!');
      navigate('/'); // redirect to login
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    mutate({ name, email, password });
  };

  return (
    <div style={{ width: '300px', margin: '100px auto' }}>
      <h2>Register</h2>

      {error && (
        <p style={{ color: 'red' }}>
          {error.response?.data?.message || 'Registration failed'}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />
        <br />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
