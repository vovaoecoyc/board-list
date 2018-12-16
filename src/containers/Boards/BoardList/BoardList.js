import React, { Fragment } from 'react'

import BoardListItem from './BoardListItem'

const BoardList = ({ dataBoards }) => {
  return (
    <Fragment>
      {dataBoards.length > 0
        ? dataBoards.map((board, index) => {
            return <BoardListItem key={board.id} index={index + 1} board={board} />
          })
        : ''}
    </Fragment>
  )
}

export default BoardList
