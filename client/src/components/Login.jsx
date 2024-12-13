import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from './AuthContext/Auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('user');

  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const user = await login(username, password, loginType);
      
     
      if (loginType === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/viewquizzes');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Quiz Platform Login</h1>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="flex bg-blue-100 rounded-lg p-1">
              <button 
                onClick={() => setLoginType('user')}
                className={`px-4 py-2 rounded-lg transition ${
                  loginType === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-blue-500 hover:bg-blue-200'
                }`}
              >
                User Login
              </button>
              <button 
                onClick={() => setLoginType('admin')}
                className={`px-4 py-2 rounded-lg transition ${
                  loginType === 'admin' 
                    ? 'bg-green-500 text-white' 
                    : 'text-green-500 hover:bg-green-200'
                }`}
              >
                Admin Login
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {loginType === 'admin' ? 'Admin Login' : 'User Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to={"/signup"} className="text-sm text-blue-600 hover:underline">
              New to Quiz Platform? Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;