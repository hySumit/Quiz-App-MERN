import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./AuthContext/Auth"; 

const QuizStart = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { currentQuiz, quizzes } = useContext(AppContext);

  useEffect(() => {
    
    if (!currentQuiz || currentQuiz._id !== quizId) {
      const foundQuiz = quizzes.find(q => q._id === quizId);
      if (!foundQuiz) {
       
        navigate("/viewquizzes");
      }
    }
  }, [currentQuiz, quizId, quizzes, navigate]);

  const handleStartQuiz = () => {
    navigate(`/quiz/${quizId}/take`, { state: { quiz: currentQuiz } });
  };

  if (!currentQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading Quiz Details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <h1 className="text-3xl font-bold text-white text-center">{currentQuiz.title}</h1>
          </div>
          
          <div className="p-8">
            <div className="mb-6">
              <p className="text-gray-700 text-lg mb-4">
                Quiz Details:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600">Total Questions</p>
                  <p className="text-xl font-bold text-blue-800">{currentQuiz.questions.length}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600">Estimated Time</p>
                  <p className="text-xl font-bold text-blue-800">
                    {currentQuiz.questions.length * 1.5} mins
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 text-lg mb-4">
                Instructions:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Read each question carefully</li>
                <li>You cannot go back to previous questions</li>
                <li>Once submitted, your answer cannot be changed</li>
                <li>Make sure to complete the quiz within the time limit</li>
              </ul>
            </div>

            <div className="text-center">
              <button 
                onClick={handleStartQuiz}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizStart;