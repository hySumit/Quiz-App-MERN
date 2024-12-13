import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [quizzes, setQuizzes] = useState([]); 
  const [currentQuiz, setCurrentQuiz] = useState(null); 
  const [userAnswers, setUserAnswers] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); 
  const [score, setScore] = useState(0); 
  const [leaderboard, setLeaderboard] = useState([]); 
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); 
  const [error, setError] = useState(null); 

  // API URLs
  const API_BASE = 'http://localhost:8080'; 
  const QUIZ_URL = `${API_BASE}/quiz`;
  const USER_URL = `${API_BASE}/user`;
  const LEADERBOARD_URL = `${API_BASE}/leaderboard`;
  const AUTH_URL = `${API_BASE}/user`;


  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(QUIZ_URL);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error.message);
      setError('Failed to fetch quizzes.');
    }
  };


  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(LEADERBOARD_URL);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error.message);
      setError('Failed to fetch leaderboard.');
    }
  };


  const login = async (username, password, loginType = 'user') => {
    try {
      const response = await axios.post(`${AUTH_URL}/login`, { 
        username, 
        password,
        role: loginType 
      });
      
      const userData = response.data;
      setUser(userData);
      
    
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      
      setError(null);
      return userData;
    } catch (error) {
      console.error('Error logging in:', error.message);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
      throw error;
    }
  };


  const logout = () => {

    setUser(null);
    setQuizzes([]);
    setCurrentQuiz(null);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setIsQuizCompleted(false);
    setScore(0);
    setLeaderboard([]);
    setError(null);


    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };


  const handleAnswerSelection = (questionIndex, selectedAnswer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setUserAnswers(updatedAnswers);

    if (questionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(questionIndex + 1);
    } else {
      setIsQuizCompleted(true); 
      calculateScore(); 
    }
  };

 
  const calculateScore = () => {
    let totalScore = 0;
    currentQuiz.questions.forEach((question, index) => {
      const correctOption = question.options.find(opt => opt.isCorrect);
      if (userAnswers[index] === correctOption?.text) {
        totalScore += 1; 
      }
    });
    setScore(totalScore);
    submitScore(totalScore);
  };


  const submitScore = async (finalScore) => {
    try {
      if (user) {
        await axios.post(`${LEADERBOARD_URL}`, { 
          userId: user._id, 
          quizId: currentQuiz._id,
          username: user.username,
          score: finalScore 
        });
      }
    } catch (error) {
      console.error('Error submitting score:', error.message);
      setError('Failed to submit score.');
    }
  };


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); 
  };


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);


  useEffect(() => {
    if (user) {
      fetchQuizzes();
      if (user.role === 'admin') {
        fetchLeaderboard();
      }
    }
  }, [user]);


  const value = useMemo(
    () => ({
      user,
      quizzes,
      currentQuiz,
      setCurrentQuiz,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      userAnswers,
      setUserAnswers,
      isQuizCompleted,
      score,
      leaderboard,
      theme,
      error,
      login,
      logout,
      handleAnswerSelection,
      toggleTheme,
      fetchQuizzes,
      fetchLeaderboard,
    }),
    [user, quizzes, currentQuiz, currentQuestionIndex, userAnswers, isQuizCompleted, score, leaderboard, theme, error]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};