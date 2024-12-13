import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'score',
    direction: 'descending'
  });

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/leaderboard');
        setLeaderboardData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch leaderboard data');
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Sorting function
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'descending' 
        ? 'ascending' 
        : 'descending'
    }));
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading Leaderboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
          <h2 className="text-2xl text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Quiz Platform Leaderboard</h1>
          </div>

          {leaderboardData.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No leaderboard entries available.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-100">
                  <tr>
                    <th 
                      className="p-4 text-left cursor-pointer hover:bg-purple-200"
                      onClick={() => handleSort('username')}
                    >
                      Username
                    </th>
                    <th 
                      className="p-4 text-left cursor-pointer hover:bg-purple-200"
                      onClick={() => handleSort('quizId')}
                    >
                      Quiz
                    </th>
                    <th 
                      className="p-4 text-left cursor-pointer hover:bg-purple-200"
                      onClick={() => handleSort('score')}
                    >
                      Score
                    </th>
                    <th 
                      className="p-4 text-left cursor-pointer hover:bg-purple-200"
                      onClick={() => handleSort('date')}
                    >
                      Completed At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedLeaderboard.map((entry, index) => (
                    <tr 
                      key={entry._id} 
                      className={`
                        ${index % 2 === 0 ? 'bg-white' : 'bg-purple-50'} 
                        hover:bg-purple-100 transition
                      `}
                    >
                      <td className="p-4">{entry.username}</td>
                      <td className="p-4">
                        {entry.quizId && entry.quizId.title 
                          ? entry.quizId.title 
                          : 'Unknown Quiz'}
                      </td>
                      <td className="p-4">
                        <span 
                          className={`
                            px-2 py-1 rounded-full text-sm font-bold
                            ${entry.score >= 90 
                              ? 'bg-green-100 text-green-800' 
                              : entry.score >= 80 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                            }
                          `}
                        >
                          {entry.score}%
                        </span>
                      </td>
                      <td className="p-4">
                        {new Date(entry.date).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLeaderboard;