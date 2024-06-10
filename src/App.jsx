import { useState } from 'react'

import './App.css'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Auth from './pages/Auth/Auth'
import PageLayout from './Layouts/PageLayout'
import useAuthStore from './Store/authStore'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth } from './Firebase/Firebase'
function App() {

  const [user] = useAuthState(auth)
  console.log(user)
  return (
    <PageLayout>
   
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to={'/auth'} />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path='/auth' element={ <Auth />} />
      </Routes>
    </PageLayout>
  )
}

export default App
