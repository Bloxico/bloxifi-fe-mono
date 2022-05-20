/* eslint-disable */
import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { BoxLayout, Text, StackLayout } from '@bloxifi/ui'

export const ConnectWalletButton = () => {
  const [error, setError] = useState(false)
  const { activate, active, account, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(new InjectedConnector({}), undefined, true)
      setError(false)
    } catch (e) {
      setError(true)
    }
  }

  function disconnect() {
    try {
      deactivate()
    } catch (error) {
      console.log(error)
    }
  }

  if (error) {
    return (
      <Text type="text xl" color="red" semiBold align="center">
        Connection failed!
      </Text>
    )
  }

  return (
    <BoxLayout>
      {active ? (
        <StackLayout>
          <Text type="text xl" color="green" semiBold align="center">
            Connected!
          </Text>
          <Text type="text xl" color="textGray" semiBold align="center">
            {account}
          </Text>
          <button onClick={disconnect}>Disconnect</button>
        </StackLayout>
      ) : (
        <Text type="text xl" color="textGray" semiBold align="center">
          <button
            onClick={async () => {
              await connect()
            }}
          >
            Connect wallet
          </button>
        </Text>
      )}
    </BoxLayout>
  )
}
