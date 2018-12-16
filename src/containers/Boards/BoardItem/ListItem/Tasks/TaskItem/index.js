import React, { Component } from 'react'
import { Row, Col, Alert } from 'reactstrap'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

import styles from './TaskItem.module.css'
import { removeTask } from '../../../../../../store/actions'

class TaskItem extends Component {
  handlerClickRemoveTask = () => {
    this.props.removeTask(this.props.idUser, this.props.idBoard, this.props.idList, this.props.task.id)
  }
  render() {
    return (
      <Col md={12}>
        <Alert className={`p-1 pl-2 pr-2 mb-1 ${styles.currentTask}`} color="secondary">
          <Row>
            <Col md={10}>{this.props.task.value}</Col>
            <Col className="text-center" md={2}>
              <FontAwesome
                onClick={this.handlerClickRemoveTask}
                className={`${styles.closeIcon}`}
                name="close"
                style={{ color: '#dc3545' }}
              />
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
  removeTask: (idUser, idBoard, idList, idTask) => {
    dispatch(removeTask(idUser, idBoard, idList, idTask))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskItem)
