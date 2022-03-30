import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import Dashboard from './Pages/UserDashboard';
import UserContext from './Context/UserContext';
import UseUser from './Hooks/use-user';

function App() {
  return (
    <>
      <UserContext.Provider value={UseUser()}>
        <BrowserRouter >
        {/* <NavbarComponent /> */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
