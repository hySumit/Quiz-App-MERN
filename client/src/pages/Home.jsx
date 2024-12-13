import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome to Quiz Platform</h1>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Registration Options</h2>
            
            <div className="grid grid-cols-2 gap-6">
              {/* User Registration */}
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-800 mb-4">User Registration</h3>
                <p className="text-gray-600 mb-4">
                  Register as a user to take quizzes and view your scores.
                </p>
                <Link 
                  to="/signup"
                  className="w-full block bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 text-center"
                >
                  Register as User
                </Link>
              </div>
              
              {/* Admin Registration */}
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-800 mb-4">Admin Registration</h3>
                <p className="text-gray-600 mb-4">
                  Register as an admin to create and manage quizzes.
                </p>
                <Link 
                  to="/admin-signup"
                  className="w-full block bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 text-center"
                >
                  Register as Admin
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account? {" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;