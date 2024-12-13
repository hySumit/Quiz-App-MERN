import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AuthContext/Auth"; 

const ViewQuizzes = () => {
  const { quizzes, setCurrentQuiz } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
   
    if (quizzes.length > 0) {
      setLoading(false);
    }
  }, [quizzes]);

  const handleStartQuiz = (quiz) => {
    
    setCurrentQuiz(quiz);
    
    navigate(`/quiz/${quiz._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading Quizzes...</p>
        </div>
      </div>
    );
  }

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
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Available Quizzes</h1>
          </div>

          {quizzes.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No quizzes available at the moment.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {quizzes.map((quiz) => (
                <div 
                  key={quiz._id} 
                  className="p-6 hover:bg-blue-50 transition duration-300 flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {quiz.title}
                    </h2>
                    <p className="text-gray-600">
                      {quiz.questions.length} Questions
                    </p>
                  </div>
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewQuizzes;