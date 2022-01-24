import React, { createContext, useState, useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import Web3 from "web3";

export const Context = createContext()
import abiJson from 'assets/usdc-abi.json'
// import abiJson from 'assets/matic-abi.json'

const USDC_CONTRACT_ADDRESS = '0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e'
const USDC_RECEIVE_ADDRESS = '0x5AAD2BB0762D13C04D11176bbCb834aEdaF26021'

// const USDC_CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'

const Provider = ({ children }) => {
  const [cookies, setCookies, removeCookies] = useCookies(['isAuth', 'userinfo', 'access_token', 'refresh_token'])
  const [loading, setLoading] = useState(false);

  const initialState =
  {
    provider: null,
    web3Provider: null,
    address: null,
    chainId: null,
    tokenContract: null,
    stakingContractV1: null,
    stakingContractV2: null,
    version1: false
  };

  const [walletState, setWalletState] = useState(initialState);

  const rpc = 'https://rpc-mumbai.maticvigil.com/';
  const providerOptions =
  {
    walletconnect:
    {
      package: WalletConnectProvider,
      options:
      {
        rpc:
        {
          80001: rpc
        },
        chainId: 80001
      },
    },
  };
  const web3Modal = new Web3Modal(
  {
    network: "binance",
    cacheProvider: true,
    providerOptions
  });

  const connectWallet = useCallback(async () =>
  {
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      const account = await web3.eth.getAccounts();

      setWalletState(previousData => ({...previousData, provider, web3Provider:web3, chainId:80001, address: account[0]}));
    } catch(error) {}
  },[]);

  const disconnect = useCallback(async () =>
  {
    try {
      if (walletState.provider?.disconnect)
        await walletState.provider.disconnect();

      await web3Modal.clearCachedProvider();
      setWalletState(() => (initialState));
      window.location.reload();
    } catch(error) {}
  },[walletState.provider]);

  const buyPassCrypto = useCallback(async (price) => {
    try {
      if (walletState.provider) {
        const web3 = walletState.web3Provider;
        const contract = new web3.eth.Contract(abiJson, USDC_CONTRACT_ADDRESS);
        // console.log(contract)
        const amount = price;
        const tx = {
          from: walletState.address,
          to: USDC_RECEIVE_ADDRESS,
          data: contract.methods.transfer(USDC_RECEIVE_ADDRESS, web3.utils.toBN(amount)).encodeABI()
        }
        web3.eth.sendTransaction(tx).then(res => {
          console.log("res", res);
        }).catch(err => {
          console.log("err", err);
        })
        // This code was written and tested using web3 version 1.0.0-beta.26
      }
    } catch(error) {
      console.log(error);
    }
  }, [walletState.provider])

  useEffect(() => {
    if (walletState.provider?.on)
    {
      const handleAccountsChanged = (accounts) =>
        setWalletState(previousData=>({...previousData, account: accounts[0]}));

      const handleChainChanged = (chainId) => {
        chainId = parseInt(chainId.substr(5))
        setWalletState(previousData=>({...previousData, chainId: chainId}))
      }

      const handleDisconnect = () =>
        disconnect();

      walletState.provider.on('accountsChanged', handleAccountsChanged);
      walletState.provider.on('chainChanged', handleChainChanged);
      walletState.provider.on('disconnect', handleDisconnect);

      return () => {
        if (walletState.provider.removeListener)
        {
          walletState.provider.removeListener('accountsChanged', handleAccountsChanged);
          walletState.provider.removeListener('chainChanged', handleChainChanged);
          walletState.provider.removeListener('disconnect', handleDisconnect);
        }
      }
    }
  },[walletState.provider, disconnect]);

  useEffect(() => {
    if (web3Modal.cachedProvider)
      connectWallet();
  },[]);

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
    walletState,
    setWalletState,
    connectWallet,
    disconnect,
    buyPassCrypto
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