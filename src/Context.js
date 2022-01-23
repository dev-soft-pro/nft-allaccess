import React, { createContext, useState, useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import WalletConnectProvider from '@walletconnect/web3-provider';
// import Web3Modal from 'web3modal';
// import Web3 from "web3";

export const Context = createContext()

const Provider = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies(['isAuth', 'userinfo', 'access_token', 'refresh_token'])
  const [loading, setLoading] = useState(false);

//   const initialState =
//   {
//     provider: null,
//     web3Provider: null,
//     address: null,
//     chainId: null,
//     tokenContract: null,
//     stakingContractV1: null,
//     stakingContractV2: null,
//     version1: false
//   };

//   const [walletState, setWalletState] = useState(initialState);

//   const rpc = 'https://rpc-mumbai.maticvigil.com/';
//   const providerOptions =
//   {
//     walletconnect:
//     {
//       package: WalletConnectProvider,
//       options:
//       {
//         rpc:
//         {
//           56: rpc
//         },
//         chainId: 56
//       },
//     },
//   };
//   const web3Modal = new Web3Modal(
//   {
//     network: "binance",
//     cacheProvider: true,
//     providerOptions
//   });

//   const connectWallet = useCallback(async () =>
//   {
//     try
//     {
//       const provider = await web3Modal.connect();
//       const web3 = new Web3(provider);

//       const account = await web3.eth.getAccounts();

//       setWalletState(previousData => ({...previousData, provider, web3Provider:web3, chainId:56, address: account[0]}));
//     }
//     catch(error) {}
//   },[]);

//   const disconnect = useCallback(async () =>
//   {
//     try
//     {
//       if (walletState.provider?.disconnect)
//         await walletState.provider.disconnect();

//       await web3Modal.clearCachedProvider();
//       setWalletState(() => (initialState));
//       window.location.reload();
//     }
//     catch(error) {}
//   },[walletState.provider]);

//   useEffect(() => {
//     if (walletState.provider?.on)
//     {
//       const handleAccountsChanged = (accounts) =>
//         setWalletState(previousData=>({...previousData, account: accounts[0]}));

//       const handleChainChanged = (chainId) => {
//         chainId = parseInt(chainId.substr(2))
//         setWalletState(previousData=>({...previousData, chainId: chainId}))
//       }

//       const handleDisconnect = () =>
//         disconnect();

//       walletState.provider.on('accountsChanged', handleAccountsChanged);
//       walletState.provider.on('chainChanged', handleChainChanged);
//       walletState.provider.on('disconnect', handleDisconnect);

//       return () => {
//         if (walletState.provider.removeListener)
//         {
//           walletState.provider.removeListener('accountsChanged', handleAccountsChanged);
//           walletState.provider.removeListener('chainChanged', handleChainChanged);
//           walletState.provider.removeListener('disconnect', handleDisconnect);
//         }
//       }
//     }
//   },[walletState.provider, disconnect]);

//   useEffect(() => {
//     if (web3Modal.cachedProvider)
//       connectWallet();
//   },[]);

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
    },
    // walletState,
    // setWalletState,
    // connectWallet,
    // disconnect,
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