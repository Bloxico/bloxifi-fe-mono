import { useReducer } from 'react'
import { createContainer } from 'unstated-next'
import { t } from 'i18next'

interface State {
  title: string
}

const defaultState: State = {
  title: 'BloxiFi',
}

const reducer = (state: State, action) => {
  switch (action.type) {
    case 'setTitle': {
      return {
        ...state,
        title: t(action.value),
      }
    }
    default: {
      return state
    }
  }
}

// TODO: type
function usePage(initialState = defaultState) {
  const [state, dispatch] = useReducer(reducer, initialState)

  function setTitle(title = 'BloxiFi') {
    dispatch({ type: 'setTitle', value: title })
  }

  return { state, dispatch, setTitle }
}

export const PageContainer = createContainer(usePage)
