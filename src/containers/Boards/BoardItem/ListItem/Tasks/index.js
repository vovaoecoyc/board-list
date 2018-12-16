import React, { Fragment } from 'react'

import TaskItem from './TaskItem'

export default function Tasks({ tasks, idBoard, idList }) {
  return (
    <Fragment>
      {tasks.map(task => (
        <TaskItem key={task.id} idBoard={idBoard} idList={idList} task={task} />
      ))}
    </Fragment>
  )
}
