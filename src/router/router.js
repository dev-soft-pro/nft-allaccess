import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Constans
import * as ROUTES from 'constants/routes';
// Login Views
import Home from 'pages/Home'
// import Login from 'pages/auth/Login'
// import ForgotPassword from 'pages/auth/ForgotPassword'

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />} />
        {/* <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default router;