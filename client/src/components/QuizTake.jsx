import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizTake = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quiz } = location.state;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (option) => {
   
    const selectedOptionText = typeof option === 'object' ? option.text : option;
    
    const newAnswer = {
      questionId: currentQuestion._id, 
      answer: selectedOptionText
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
     
      navigate('/quiz-result', { 
        state: { 
          quiz, 
          answers: updatedAnswers 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </h1>
        <p className="text-gray-800 mb-6">{currentQuestion.text}</p>
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className="block w-full bg-blue-100 text-left px-4 py-2 rounded-lg hover:bg-blue-200 transition"
            >
              
              {typeof option === 'object' ? option.text : option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizTake;