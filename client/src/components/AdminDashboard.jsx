import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './AuthContext/Auth';

const AdminDashboard = () => {
  const { user, logout } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Welcome, {user?.username || 'Admin'}
                </h2>
                <p className="text-gray-600">Manage your quiz platform here</p>
              </div>
              <button 
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Create Quiz Card */}
              <div className="bg-blue-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Create Quiz</h3>
                <p className="text-gray-600 mb-4">
                  Design and set up new quizzes for your platform
                </p>
                <Link 
                  to="/create-quiz"
                  className="w-full block bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 text-center transition"
                >
                  Create Quiz
                </Link>
              </div>

              {/* Manage Quizzes Card */}
              <div className="bg-green-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-800 mb-4">Manage Quizzes</h3>
                <p className="text-gray-600 mb-4">
                  View, edit, and delete existing quizzes
                </p>
                <Link 
                  to="/manage-quizzes"
                  className="w-full block bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 text-center transition"
                >
                  Manage Quizzes
                </Link>
              </div>

              {/* Leaderboard Card */}
              <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-purple-800 mb-4">Leaderboard</h3>
                <p className="text-gray-600 mb-4">
                  View quiz performance and user scores
                </p>
                <Link 
                  to="/admin-leaderboard"
                  className="w-full block bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 text-center transition"
                >
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;