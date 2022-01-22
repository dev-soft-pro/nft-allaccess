import React, { createContext, useState } from 'react'
import { useCookies } from 'react-cookie'
export const Context = createContext()

const Provider = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies(['isAuth', 'userinfo', 'access_token', 'refresh_token'])
  const [loading, setLoading] = useState(false);

  const value = {
    cookies,
    loading,
    activateAuth: (data) => {
      setCookies('isAuth', true, { path: '/' });
      setCookies('userinfo', JSON.stringify(data.user), { path: '/' });
      setCookies('access_token', data.access, { path: '/' });
      setCookies('refresh_token', data.refresh, { path: '/' });
    },
    removeAuth: () => {
      setCookies('isAuth', false, { path: '/' });
      removeCookies('userinfo', { path: '/' });
      removeCookies('access_token', { path: '/' });
      removeCookies('refresh_token', { path: '/' });
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