import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const station = 'ESP1'

function App() {

  console.log(station)
  // const navigate = useNavigate()


  return (
    <div className='App'>

      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/:station' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/config' element={<ConfigsPage />} /> */}
      </Routes>

    </div>

  )
}

export default App
