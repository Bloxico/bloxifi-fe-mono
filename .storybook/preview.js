import { DocsPage, DocsContainer } from '@storybook/addon-docs'
import { initTranslations } from '@bloxifi/core'
import React from 'react'
initTranslations()

export const decorators = [
  Story => (
    <div style={{ padding: '2rem' }}>
      <Story />
    </div>
  ),
]

export const parameters = {
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
  options: {
    storySort: ([, { kind: a }], [, { kind: b }]) => {
      if (b.includes('Overview')) {
        return +1
      }

      return (a > b) - (a < b)
    },
  },
  controls: { expanded: true, hideNoControlsWarning: true },
}
