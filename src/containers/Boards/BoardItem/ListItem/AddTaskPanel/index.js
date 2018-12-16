import React, { Component, Fragment } from 'react'
import { Row, Col, Input, Button } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addTaskToList } from '../../../../../store/actions'

class AddTaskPanel extends Component {
  state = {
    listItemName: ''
  }
  handlerChange = e => {
    let value = e.target.value
    this.setState({ listItemName: value })
  }
  handlerAddTask = () => {
    let currentBoard = this.props.dataBoards.filter((board, index) => index === this.props.match.params.id - 1)
    let listItemName = this.state.listItemName
    this.setState({ listItemName: '' })
    this.props.addTaskToList(listItemName, this.props.idUser, currentBoard[0].id, this.props.idList)
  }
  render() {
    return (
      <Row className="p-0">
        <Col className="p-0" md={8}>
          <Input value={this.state.listItemName} onChange={this.handlerChange} type="text" />
        </Col>
        <Col className="p-0 text-center" md={4}>
          <Button onClick={this.handlerAddTask} color="info">
            <FontAwesome name="plus" />
          </Button>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  idUser: state.auth.idUser,
  dataBoards: state.boards.dataBoards
})

const mapDispatchToProps = dispatch => ({
  addTaskToList: (taskName, idUser, idBoard, idList) => {
    dispatch(addTaskToList(taskName, idUser, idBoard, idList))
  }
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddTaskPanel)
)
