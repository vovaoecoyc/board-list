import * as actionsType from '../actions/actionsType'
//import { removeBoard } from '../actions/boards'

const initialState = {
  dataBoards: []
}

const addBoard = (state, action) => {
  return { ...state }
}

const loadBoards = (state, action) => {
  return { ...state, dataBoards: action.payload }
}

const addListToBoard = (state, action) => {
  return { ...state }
}

const addTaskToList = (state, action) => {
  return { ...state }
}

const removeBoard = (state, actions) => {
  return { ...state }
}

const removeList = (state, actions) => {
  return { ...state }
}

const removeTask = (state, actions) => {
  return { ...state }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.ADD_BOARD:
      return addBoard(state, action)
    case actionsType.LOAD_BOARDS:
      return loadBoards(state, action)
    case actionsType.ADD_LIST_TO_BOARD:
      return addListToBoard(state, action)
    case actionsType.ADD_TASK_TO_LIST:
      return addTaskToList(state, action)
    case actionsType.REMOVE_BOARD:
      return removeBoard(state, action)
    case actionsType.REMOVE_LIST:
      return removeList(state, action)
    case actionsType.REMOVE_TASK:
      return removeTask(state, action)
    default:
      return state
  }
}

export default reducer
