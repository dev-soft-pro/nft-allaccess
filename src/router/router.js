import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Constants
import * as ROUTES from 'constants/routes';
// Pages
import Home from 'pages/Home'
import Login from 'pages/Login'
import Signup from 'pages/Signup';
import DropDetail from 'pages/DropDetail';


function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Signup />} />
        <Route path={ROUTES.DROP_DETAIL} element={<DropDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default router;