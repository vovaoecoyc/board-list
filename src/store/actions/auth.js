import * as actionsType from './actionsType'
import firebase from '../../firebase'

const auth = (login, password, routeHistory, dispatch) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(login, password)
    .then(response => {
      dispatch({ type: actionsType.AUTH_USER, payload: { idUser: response.user.uid } })
      dispatch(loadingFinish())
      routeHistory.push('/')
    })
    .catch(error => {
      dispatch({ type: actionsType.AUTH_ERROR, payload: error })
      dispatch(loadingFinish())
      //console.log(error)
    })
}

export const registerUser = (userEmail, password, routeHistory) => dispatch => {
  dispatch(loadingStart())
  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, password)
    .then(response => {
      console.log(response)
      auth(userEmail, password, routeHistory, dispatch)
    })
    .catch(error => {
      console.log(error)
      dispatch({ type: actionsType.AUTH_ERROR, payload: error })
      dispatch(loadingFinish())
    })
}

export const authUser = (login, password, routeHistory) => dispatch => {
  dispatch(loadingStart())
  localStorage.setItem('email', login)
  auth(login, password, routeHistory, dispatch)
}

export const clearError = () => {
  return { type: actionsType.CLEAR_ERROR }
}

export const logoutUser = () => {
  firebase.auth().signOut()
  return { type: actionsType.LOGOUT_USER, payload: false }
}

export const setUserAuthenticate = isAuth => {
  return { type: actionsType.SET_AUTH_USER, payload: isAuth }
}

export const loadingStart = () => {
  return { type: actionsType.LOADING_START }
}

export const loadingFinish = () => {
  return { type: actionsType.LOADING_FINISH }
}

export const updateUserId = userId => {
  return { type: actionsType.UPDATE_USER_ID, payload: userId }
}
