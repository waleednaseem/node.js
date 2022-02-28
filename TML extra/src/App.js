import React, { useEffect } from 'react'
import SignUp from './LoginRegister/SignUp'
import Login from './LoginRegister/Login'
import MainPage from './Component/MainPage'
import {
  BrowserRouter as Router,
  Routes,
  Route
  // Navigate
} from "react-router-dom";
import History from './Component/History';
import Dashboard from './Component/Dashboard';
import Pdf from "./PDF/Pdf";
import jwt from 'jwt-decode'

const login = localStorage.getItem('Login')
const check=login&&jwt(login)

export default function App() {
  return (
    <>
      <Router>
        {!login ? (
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        ) : (
          <MainPage>
            <Routes>
              {check.user.Username === 'admin'?<Route path="/history" element={<History />} />:<Route exact path='/' element={<Dashboard />} />}
              <Route path="/history" element={<History />} />
              { check.user.Username === 'admin'&&<Route path="/register" element={<SignUp />} />}
            </Routes>
          </MainPage>
        )}
      </Router>
    </>
  )
}
