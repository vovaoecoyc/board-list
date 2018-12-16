import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'
import { Redirect } from 'react-router-dom'

import AddElement from '../AddElement'
import Lists from './Lists'
import * as actionsType from '../../../store/actions/actionsType'

export default class BoardItem extends Component {
  render() {
    let content = <Redirect to="/" />
    if (this.props.dataBoards.length > 0) {
      let filtredBoard = this.props.dataBoards.filter((board, index) => index === this.props.match.params.id - 1)
      content = (
        <Fragment>
          <Row>
            <Col>{<Alert color="info">{filtredBoard[0].value}</Alert>}</Col>
          </Row>
          <Row className="align-items-center">
            <AddElement typeAction={actionsType.ADD_LIST_TO_BOARD} />
          </Row>
          <Row>
            <Lists idBoard={filtredBoard[0].id} lists={filtredBoard[0].lists} />
          </Row>
        </Fragment>
      )
    }
    return <Container>{content}</Container>
  }
}
