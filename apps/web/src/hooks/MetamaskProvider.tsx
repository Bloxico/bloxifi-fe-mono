import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'

export const supportedNetworks = {
  1: 'mainnet',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan',
  1284: 'moonbeam',
}

export const supportedChainIds = Object.keys(supportedNetworks).map(key =>
  Number(key),
)

const injectedConnector = new InjectedConnector({
  supportedChainIds,
})

function MetamaskProvider({ children }) {
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React()
  const [loaded, setLoaded] = useState(false)

  const connectWallet = () =>
    activateNetwork(injectedConnector, undefined, true).catch(err =>
      console.log('activate error', err, err.data.status),
    )

  useEffect(() => {
    injectedConnector
      .isAuthorized()
      .then(isAuthorized => {
        setLoaded(true)
        if (isAuthorized && !networkActive && !networkError) {
          activateNetwork(injectedConnector, undefined, true).catch(err => {
            console.log('activate error', err)
            throw new Error()
          })
        }
      })
      .catch(err => {
        console.log('throwed', err)
        setLoaded(true)
      })
  }, [activateNetwork, networkActive, networkError])

  if (loaded) {
    return children
  }
  return <>Loading</>
}

export default MetamaskProvider
