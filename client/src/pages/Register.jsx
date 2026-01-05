import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/userApi';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      alert('User registered successfully!');
      navigate('/'); // redirect to login
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    mutate({ name, email, password });
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
      <h2 style={{ textAlign: 'center' }}>Register</h2>

      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>
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
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '15px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

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
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account?{' '}
        <Link
          to="/"
          style={{
            color: '#4CAF50',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
