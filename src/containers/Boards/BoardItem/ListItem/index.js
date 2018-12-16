import React, { Component } from 'react'
import { Row, Col, Alert, Button } from 'reactstrap'
import { connect } from 'react-redux'

import styles from './ListItem.module.css'
import AddTaskPanel from './AddTaskPanel'
import Tasks from './Tasks'
import { removeList } from '../../../../store/actions'

class ListItem extends Component {
  handlerClickDeleteList = () => {
    this.props.removeList(this.props.idUser, this.props.idBoard, this.props.list.id)
  }
  render() {
    return (
      <Col md={4}>
        <Alert className={`${styles.item}`} color="light">
          <Row>
            <Col className="m-auto" md={4}>
              {this.props.list.value}
            </Col>
            <Col md={8}>
              <AddTaskPanel idList={this.props.list.id} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Tasks idBoard={this.props.idBoard} idList={this.props.list.id} tasks={this.props.list.tasks} />
          </Row>
          <Row className="justify-content-center mt-2">
            <Col md={4}>
              <Button onClick={this.handlerClickDeleteList} color="danger">
                Delete List
              </Button>
            </Col>
          </Row>
        </Alert>
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  idUser: state.auth.idUser
})

const mapDispatchToProps = dispatch => ({
  removeList: (idUser, idBoard, idList) => {
    dispatch(removeList(idUser, idBoard, idList))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem)
