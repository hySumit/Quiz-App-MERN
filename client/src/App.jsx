import { useState } from 'react'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import CreateQuiz from './components/CreateQuize'
import ViewQuizzes from './components/ViewQuizzes'
import QuizStart from './components/QuizStart'
import QuizTake from './components/QuizTake'
import Home from './pages/Home'  
import QuizResult from './components/QuizResult'
import AdminDashboard from './components/AdminDashboard'
import UserLeaderboard from './components/UserLeaderboard'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/signup' element={<Signup userType="user"/>}/>
        <Route path='/admin-signup' element={<Signup userType="admin"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/quiz' element={<CreateQuiz/>}/>
        <Route path='/Viewquizzes' element={<ViewQuizzes/>}/>

        <Route path="/quiz/:quizId" element={<QuizStart />} />
        <Route path="/quiz/:quizId/take" element={<QuizTake />} />
        <Route path="/quiz-result" element={<QuizResult/>} />

        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin-leaderboard" element={<UserLeaderboard/>} />

      </Routes>
    </>
  )
}

export default App