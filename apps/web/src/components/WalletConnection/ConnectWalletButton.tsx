/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { BoxLayout, Text, StackLayout } from '@bloxifi/ui'
import { supportedChainIds } from '../../hooks/MetamaskProvider'

declare global {
  interface Window {
    ethereum?: any
  }
}

export const ConnectWalletButton = () => {
  const [hasError, setHasError] = useState(false)
  const web3Context = useWeb3React()
  const isMetamaskInstalled = typeof window.ethereum !== 'undefined'

  useEffect(() => {
    //ntext.chainId && setCurrentNetwork(web3Context.chainId)
  }, [web3Context.chainId])
  console.log('CHAIN', web3Context.chainId)

  async function connect() {
    try {
      await web3Context.activate(
        new InjectedConnector({ supportedChainIds }),
        undefined,
        true,
      )
      setHasError(false)
    } catch (e) {
      setHasError(true)
    }
  }

  function disconnect() {
    try {
      web3Context.deactivate()
    } catch (error) {
      throw new Error(error)
    }
  }

  if (hasError) {
    return (
      <Text type="text xl" color="red" semiBold align="center">
        Connection failed!
      </Text>
    )
  }

  if (!isMetamaskInstalled) {
    return (
      <Text type="text xl" color="red" semiBold align="center">
        Please install Metamask
      </Text>
    )
  } else if (!web3Context.active) {
    return (
      <Text type="text xl" color="red" semiBold align="center">
        Wrong network connection!
      </Text>
    )
  }

  return (
    <BoxLayout>
      <StackLayout>
        {web3Context.active ? (
          <>
            <Text type="text xl" color="green" semiBold align="center">
              Connected
            </Text>
            <Text type="text xl" color="textGray" semiBold align="center">
              {web3Context.account}
            </Text>
            <button onClick={disconnect}>Disconnect</button>
          </>
        ) : (
          <Text type="text xl" color="textGray" semiBold align="center">
            <button onClick={connect}>Connect wallet</button>
          </Text>
        )}
      </StackLayout>
    </BoxLayout>
  )
}
