import React, { Fragment } from 'react'

import ListItem from './ListItem'

function Lists({ lists, idBoard }) {
  return (
    <Fragment>
      {lists.length > 0
        ? lists.map((list, index) => {
            return <ListItem key={list.id} idBoard={idBoard} list={list} />
          })
        : ''}
    </Fragment>
  )
}

export default Lists
