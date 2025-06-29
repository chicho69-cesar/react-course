export const CHAT_ACTION_TYPES = {
  USERS_LOAD: '[Chat] Users Load',
  ACTIVE_CHAT: '[Chat] Active Chat',
  NEW_MESSAGE: '[Chat] New Message',
  LOAD_MESSAGES: '[Chat] Load Messages',
}

const REDUCER_ACTIONS = {
  [CHAT_ACTION_TYPES.USERS_LOAD]: (state, payload) => ({
    ...state,
    users: [...payload]
  }),
  [CHAT_ACTION_TYPES.ACTIVE_CHAT]: (state, payload) => {
    if (state.activeChat === payload) {
      return state
    }

    return {
      ...state,
      activeChat: payload,
      messages: [],
    }
  },
  [CHAT_ACTION_TYPES.NEW_MESSAGE]: (state, payload) => {
    const messageExists = state.messages.find(
      (message) => message.uid === payload.uid
    )

    if (!messageExists) {
      if (
        state.activeChat === payload.from || 
        state.activeChat === payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, payload],
        }
      }
    }

    return state
  },
  [CHAT_ACTION_TYPES.LOAD_MESSAGES]: (state, payload) => ({
    ...state,
    messages: [...payload],
  }),
}

export const chatReducer = (state, action) => {
  const { type, payload } = action
  const reducerAction = REDUCER_ACTIONS[type]
  return reducerAction ? reducerAction(state, payload) : state
}