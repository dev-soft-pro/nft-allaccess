import React, { createContext, useState } from 'react'
import { useCookies } from 'react-cookie'
export const Context = createContext()

const Provider = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies(['userinfo', 'access_token', 'refresh_token'])
  const [loading, setLoading] = useState(false);
  const [isAuth, setAuth] = useState(false);

  const value = {
    isAuth,
    cookies,
    loading,
    activateAuth: (data) => {
      setAuth(true);
      setCookies('userinfo', JSON.stringify(data.user));
      setCookies('access_token', data.access);
      setCookies('refresh_token', data.refresh);
    },
    removeAuth: () => {
      setAuth(false);
      removeCookies('userinfo');
      removeCookies('access_token');
      removeCookies('refresh_token');
    },
    updateLoadingStatus: (status) => {
      setLoading(status);
    }
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Consumer: Context.Consumer
}