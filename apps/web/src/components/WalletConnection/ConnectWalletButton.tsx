import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { BoxLayout, Text, StackLayout } from '@bloxifi/ui'

const supportedChains = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan',
  1284: 'moonbeam',
}

declare global {
  interface Window {
    ethereum?: any
  }
}

export const ConnectWalletButton = () => {
  const [hasError, setHasError] = useState(false)
  const [currentNetwork, setCurrentNetwork] = useState<number | undefined>()
  const web3Context = useWeb3React()
  const isWrongNetworkConnected =
    currentNetwork && !supportedChains[currentNetwork]
  const isMetamaskInstalled = typeof window.ethereum !== 'undefined'

  useEffect(() => {
    web3Context.chainId && setCurrentNetwork(web3Context.chainId)
  }, [web3Context.chainId])

  async function connect() {
    try {
      await web3Context.activate(new InjectedConnector({}), undefined, true)
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

  if (!isMetamaskInstalled) {
    return (
      <Text type="text xl" color="red" semiBold align="center">
        Please install Metamask
      </Text>
    )
  }

  if (hasError) {
    return (
      <Text type="text xl" color="red" semiBold align="center">
        Connection failed!
      </Text>
    )
  }

  return (
    <BoxLayout>
      <StackLayout>
        {web3Context.active ? (
          <>
            {isWrongNetworkConnected ? (
              <Text type="text xl" color="red" semiBold align="center">
                Wrong network connection!
              </Text>
            ) : (
              <>
                <Text type="text xl" color="green" semiBold align="center">
                  {`Connected to ${supportedChains[currentNetwork]} !`}
                </Text>
                <Text type="text xl" color="textGray" semiBold align="center">
                  {web3Context.account}
                </Text>
                <button onClick={disconnect}>Disconnect</button>
              </>
            )}
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
