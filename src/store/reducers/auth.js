import * as actionsType from '../actions/actionsType'

const initialState = {
  idUser: null,
  error: false,
  isAuthorized: false,
  loading: false
}

const authUser = (state, action) => {
  let isAuthorized = action.payload.idUser === null || action.payload.idUser === undefined ? false : true
  return {
    ...state,
    idUser: action.payload.idUser,
    error: false,
    isAuthorized: isAuthorized
  }
}

const authError = (state, action) => {
  return {
    ...state,
    error: action.payload.message
  }
}

const clearError = (state, action) => {
  return {
    ...state,
    error: false
  }
}

const logoutUser = (state, action) => {
  return { ...state, isAuthorized: action.payload, idUser: null }
}

const setAuthUser = (state, action) => {
  let authUser = action.payload ? true : false
  return { ...state, isAuthorized: authUser }
}

const loadingStart = (state, action) => {
  return { ...state, loading: true }
}

const loadingFinish = (state, action) => {
  return { ...state, loading: false }
}

const updateUserId = (state, action) => {
  return { ...state, idUser: action.payload }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.AUTH_USER:
      return authUser(state, action)
    case actionsType.AUTH_ERROR:
      return authError(state, action)
    case actionsType.CLEAR_ERROR:
      return clearError(state, action)
    case actionsType.LOGOUT_USER:
      return logoutUser(state, action)
    case actionsType.SET_AUTH_USER:
      return setAuthUser(state, action)
    case actionsType.LOADING_START:
      return loadingStart(state, action)
    case actionsType.LOADING_FINISH:
      return loadingFinish(state, action)
    case actionsType.UPDATE_USER_ID:
      return updateUserId(state, action)
    default:
      return state
  }
}

export default reducer
