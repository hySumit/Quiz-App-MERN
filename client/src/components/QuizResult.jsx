import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from './AuthContext/Auth';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [submitError, setSubmitError] = useState(null);
  const { quiz, answers } = location.state || {};

  if (!quiz || !answers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <p>No quiz results available</p>
      </div>
    );
  }

  // Calculate score
  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      const userAnswer = answers[index]?.answer;
      const correctAnswer = question.options.find(opt => opt.isCorrect)?.text;
      
      if (userAnswer === correctAnswer) {
        score++;
      }
    });
    return Math.round((score / quiz.questions.length) * 100);
  };

  const score = calculateScore();

  // Submit score to leaderboard
  const submitScoreToLeaderboard = async () => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post('http://localhost:8080/leaderboard', {
        userId: user._id,
        quizId: quiz._id,
        username: user.username,
        score: score,
        date: new Date().toISOString()
      });

      return response.data;
    } catch (error) {
      console.error('Failed to submit score to leaderboard', error);
      setSubmitError('Failed to update leaderboard. Your score was not recorded.');
      return null;
    }
  };

 
  React.useEffect(() => {
    if (user) {
      submitScoreToLeaderboard();
    }
  }, [user, quiz, score]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
        <div className="bg-blue-100 p-6 rounded-lg">
          <p className="text-xl mb-4">
            Your Score: {score}%
          </p>
          {submitError && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {submitError}
            </div>
          )}
        </div>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => navigate('/viewquizzes')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Back to Quizzes
          </button>
          {submitError && (
            <button
              onClick={submitScoreToLeaderboard}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
            >
              Retry Submit Score
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;