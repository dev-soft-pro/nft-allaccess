import React, { useContext } from 'react';
import { Button, Box, Text } from "@chakra-ui/react";
import { Context } from "Context";
import './styles.scss'

export default function ConnectButton() {
  const { walletState, connectWallet, disconnect } = useContext(Context);
  return !walletState.provider ? (
    <Button
      id="connect-button"
      variant="solid"
      size="md"
      opacity="{1}"
      textAlign="center"
      textColor="white"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#DC0000"
      overflow="hidden"
      borderRadius="lg"
      borderColor="white"
      onClick={ () => connectWallet() }
    >
      Connect Wallet
    </Button>
  ) : (
    <Button
      id="connect-button"
      variant="solid"
      size="md"
      opacity="{1}"
      textAlign="center"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#DC0000"
      overflow="hidden"
      borderRadius="lg"
      onClick={() => disconnect()} >
      {
        String(walletState.address.substring(0, 6)) +
        "..." +
        String(walletState.address.substring(38))
      }
  </Button>
  )
}