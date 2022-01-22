import React, { createContext, useState } from 'react'
import { useCookies } from 'react-cookie'
export const Context = createContext()

const Provider = ({ children }) => {
  const [cookies, setCookies] = useCookies(['userinfo', 'access_token', 'refresh_token'])
  const [loading, setLoading] = useState(false);

  const value = {
    cookies,
    loading,
    setUserInfo: (info) => {
      setCookies('userinfo', JSON.stringify(info));
    },
    setAccessToken: (token) => {
      setCookies('access_token', token);
    },
    setRefreshToken: (token) => {
      setCookies('userinfo', token);
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