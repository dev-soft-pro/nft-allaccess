import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Constants
import * as ROUTES from 'constants/routes';
// Pages
import Home from 'pages/Home'
import Login from 'pages/Login'
import Signup from 'pages/Signup';
import DropDetail from 'pages/DropDetail';
import Profile from 'pages/Profile';
import PassDetail from 'pages/PassDetail';
import PassBuy from 'pages/PassBuy';
import About from 'pages/About';
import ProfileEdit from 'pages/ProfileEdit';

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Signup />} />
        <Route path={ROUTES.DROP_DETAIL} element={<DropDetail />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PROFILE_EDIT} element={<ProfileEdit />} />
        <Route path={ROUTES.PASS_DETAIL} element={<PassDetail />} />
        <Route path={ROUTES.PASS_BUY} element={<PassBuy />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
        <Route path={ROUTES.PROFILE_PASS_DETAIL} element={<PassDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default router;