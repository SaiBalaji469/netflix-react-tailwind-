import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componenets/Navbar'
import Home from './assets/pages/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './assets/pages/Login'
import SignUp from './assets/pages/SignUp'
import Account from './assets/pages/Account'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './componenets/ProtectedRoute'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthContextProvider>
    <Navbar></Navbar>
     <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
     </Routes>

    </AuthContextProvider>
   
   
    
    </>
  )
}

export default App
