import React, { useContext } from 'react';
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

import { Context } from "Context";

export default function ConnectButton() {
  const { walletState, connectWallet, disconnect } = useContext(Context);
  return !walletState.provider ? (
    <Button
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
      borderColor="white"
      onClick={ () => connectWallet() }
    >
      Connect Wallet
    </Button>
  ) : (
    <Button
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