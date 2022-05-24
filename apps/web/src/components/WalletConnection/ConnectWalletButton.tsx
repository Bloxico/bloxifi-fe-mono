/* eslint-disable */
import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { BoxLayout, Text, StackLayout } from '@bloxifi/ui'

export const ConnectWalletButton = () => {
  const [hasError, setHasError] = useState(false)
  const web3Context = useWeb3React()

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

  if (hasError) {
    return (
      <Text type="text xl" color="red" semiBold align="center">
        Connection failed!
      </Text>
    )
  }

  return (
    <BoxLayout>
      {web3Context.active ? (
        <StackLayout>
          <Text type="text xl" color="green" semiBold align="center">
            Connected!
          </Text>
          <Text type="text xl" color="textGray" semiBold align="center">
            {web3Context.account}
          </Text>
          <button onClick={disconnect}>Disconnect</button>
        </StackLayout>
      ) : (
        <Text type="text xl" color="textGray" semiBold align="center">
          <button onClick={connect}>Connect wallet</button>
        </Text>
      )}
    </BoxLayout>
  )
}
