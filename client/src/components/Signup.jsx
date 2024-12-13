import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Signup = ({ userType = "user" }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await axios.post("https://quiz-app-mern-d8mk.onrender.com/user/signup", {
        username,
        password,
        role: userType  
      });

      console.log("Signup successful", response.data);
      
      navigate(userType === 'admin' ? '/quiz' : '/Viewquizzes');
    } catch (err) {
      
      if (err.response) {
        if (err.response.status === 409) {
          setError("Username already exists. Please try a different one.");
        } else {
          setError("An error occurred during signup. Please try again.");
        }
      } else if (err.request) {
        setError("No response from server. Please check your internet connection.");
      } else {
        setError("Error setting up the signup request. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
          <img
            className="mx-auto h-20 w-auto"
            src="https://vecros.com/static/media/logo.ffda51cadb3fb4901613.png"
            alt="Company Logo"
          />
        </div>
        
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
            {userType === 'admin' ? 'Admin Registration' : 'Create Account'}
          </h1>
          <p className="text-gray-600 text-center mb-6">
            {userType === 'admin' ? 'Register as an administrator' : 'Sign up to get started'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
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
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
                minLength="6"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account? {" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;