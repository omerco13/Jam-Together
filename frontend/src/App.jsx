import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreateRoomPage from './pages/CreateRoomPage'
import JoinRoomPage from './pages/JoinRoomPage'
import AdminRoomPage from './pages/AdminRoomPage'
import UsersRoomPage from './pages/UsersRoomPage'
import ResultPage from './pages/ResultPage'


function App() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-room" element={<CreateRoomPage />} />
          <Route path="/join-room" element={<JoinRoomPage />} />
          <Route path="/admin-room/:roomCode" element={<AdminRoomPage />} />
          <Route path="/user-room/:roomCode" element={<UsersRoomPage />} />
          <Route path="/results/:roomCode" element={<ResultPage />} />
      </Routes>
    </div>
    
  )  
}

export default App
