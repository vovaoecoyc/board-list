import React, { Component } from 'react'
import { Row, Col, Alert } from 'reactstrap'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

import styles from './Item.module.css'
import { removeBoard } from '../../../../store/actions'

class BoardItem extends Component {
  handlerClickRemove = e => {
    e.preventDefault()
    this.props.removeBoard(this.props.idUser, this.props.board.id)
  }
  render() {
    return (
      <Col md={4}>
        <Link className={`${styles.noDecoration}`} to={`/boards/${this.props.index}`}>
          <Alert className={`${styles.item}`} color="light">
            <Row>
              <Col md={10}>{this.props.board.value}</Col>
              <Col className="text-center" md={2}>
                <FontAwesome
                  onClick={this.handlerClickRemove}
                  className={styles.closeIcon}
                  style={{ color: '#dc3545' }}
                  name="close"
                />
              </Col>
            </Row>
          </Alert>
        </Link>
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  idUser: state.auth.idUser
})

const mapDispatchToProps = dispatch => ({
  removeBoard: (idUser, idBoard) => {
    dispatch(removeBoard(idUser, idBoard))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardItem)
