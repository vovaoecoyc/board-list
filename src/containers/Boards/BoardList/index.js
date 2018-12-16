import React, { Component } from 'react'
import { Container, Row } from 'reactstrap'

import BoardList from './BoardList'
import AddElement from '../AddElement'
import * as actionsType from '../../../store/actions/actionsType'

class Boards extends Component {
  render() {
    return (
      <Container>
        <Row className="align-items-center">
          <AddElement typeAction={actionsType.ADD_BOARD} />
          {this.props.dataBoards.length > 0 ? <BoardList dataBoards={this.props.dataBoards} /> : ''}
        </Row>
      </Container>
    )
  }
}

export default Boards
