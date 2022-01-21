import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Constants
import * as ROUTES from 'constants/routes';
// Pages
import Home from 'pages/Home'
import Login from 'pages/Login'


function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default router;