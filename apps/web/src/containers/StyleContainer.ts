import { useReducer } from 'react'
import { createContainer } from 'unstated-next'
import { Action } from '@bloxifi/types'

type ActionType = 'CHANGE_THEME' | 'SET_CSS' | 'UPDATE_CSS' | 'SET_BODY_SCROLL'

type Theme = 'light' | 'dark'

interface State {
  theme: Theme
}

const initialState: State = {
  theme: 'light',
}

const reducer = (state: State, action: Action<ActionType>) => {
  switch (action.type) {
    case 'CHANGE_THEME': {
      return {
        ...state,
        theme: action.value,
      }
    }
    default:
      return state
  }
}

function useContainer(): {
  state: State
  changeTheme: (theme: Theme) => void
} {
  const [state, dispatch] = useReducer(reducer, initialState)
  const changeTheme = (theme: Theme) => {
    dispatch({ type: 'CHANGE_THEME', value: theme })
  }
  return { state, changeTheme }
}

export const StyleContainer = createContainer(useContainer)
