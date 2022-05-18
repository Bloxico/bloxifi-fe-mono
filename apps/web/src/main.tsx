import '@bloxifi/ui/src/fonts/fonts.less'
import 'normalize.css'
import './polyfills/color.js'
import './sw'

import React from 'react'
import ReactDOM from 'react-dom'
import { initTranslations } from '@bloxifi/core'

import { App } from './App'

import { StyleContainer } from '@/containers/StyleContainer'

declare global {
  interface Window {
    Typekit: any
  }
}

async function init() {
  await initTranslations()

  ReactDOM.render(
    <StyleContainer.Provider>
      <App />
    </StyleContainer.Provider>,
    document.getElementById('main'),
  )
}

init()
