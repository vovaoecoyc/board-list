import * as actionsType from './actionsType'
import firebase from '../../firebase'

export const addElement = (elementName, idUser, typeAction, boardDBId = null) => dispatch => {
  switch (typeAction) {
    case actionsType.ADD_BOARD:
      firebase
        .database()
        .ref(`/boards/${idUser}`)
        .push({ boardName: elementName })
        .then(response => {
          dispatch({ type: actionsType.ADD_BOARD })
        })
        .catch(error => console.log(error))
      break
    case actionsType.ADD_LIST_TO_BOARD:
      firebase
        .database()
        .ref(`/boards/${idUser}/${boardDBId}/lists`)
        .push({ listName: elementName })
        .then(response => {
          dispatch({ type: actionsType.ADD_LIST_TO_BOARD })
        })
        .catch(error => console.log(error))
      break
    default:
      break
  }
}

export const addTaskToList = (taskName, idUser, idBoard, idList) => dispatch => {
  firebase
    .database()
    .ref(`/boards/${idUser}/${idBoard}/lists/${idList}/tasks`)
    .push({ taskName: taskName })
    .then(response => {
      dispatch({ type: actionsType.ADD_TASK_TO_LIST })
    })
    .catch(error => console.log(error))
}

export const removeBoard = (idUser, idBoard) => {
  firebase
    .database()
    .ref(`/boards/${idUser}/${idBoard}`)
    .remove()
  return { type: actionsType.REMOVE_BOARD }
}

export const removeList = (idUser, idBoard, idList) => {
  firebase
    .database()
    .ref(`/boards/${idUser}/${idBoard}/lists/${idList}`)
    .remove()
  return { type: actionsType.REMOVE_LIST }
}

export const removeTask = (idUser, idBoard, idList, idTask) => {
  firebase
    .database()
    .ref(`/boards/${idUser}/${idBoard}/lists/${idList}/tasks/${idTask}`)
    .remove()
  return { type: actionsType.REMOVE_TASK }
}

export const loadBoards = idUser => dispatch => {
  firebase
    .database()
    .ref(`/boards/${idUser}`)
    .on('value', snapshot => {
      //once
      let boards = snapshot.val(),
        dataBoards = []
      for (let key in boards) {
        let lists = []
        if (boards[key].lists) {
          for (let k in boards[key].lists) {
            let { tasks } = boards[key].lists[k],
              tasksArr = []
            if (tasks) {
              for (let k in tasks) {
                let elementTask = {
                  id: k,
                  value: tasks[k].taskName
                }
                tasksArr.push(elementTask)
              }
            }
            let elementList = {
              id: k,
              value: boards[key].lists[k].listName,
              tasks: tasksArr
            }
            lists.push(elementList)
          }
        }
        let elementBoard = {
          id: key,
          value: boards[key].boardName,
          lists: lists
        }
        dataBoards.push(elementBoard)
      }
      dispatch({ type: actionsType.LOAD_BOARDS, payload: dataBoards })
    })
}
