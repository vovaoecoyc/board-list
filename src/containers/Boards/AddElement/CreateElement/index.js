import React, { Component } from 'react'
import { Col, Alert } from 'reactstrap'
import FontAwesome from 'react-fontawesome'

import styles from './CreateElement.module.css'

class CreateElement extends Component {
  handlerAddClick = () => {
    this.props.addPanelCallback()
  }
  render() {
    return (
      <Col className="align-self-center" md={4}>
        <Alert onClick={this.handlerAddClick} color="info" className={`${styles.alertStyles}`}>
          <div className={`${styles.title}`}>{`Create a new ${this.props.nameElement}`}</div>
          <FontAwesome
            className={`${styles.stylePlus}`}
            name="plus"
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: 'green' }}
          />
        </Alert>
      </Col>
    )
  }
}

export default CreateElement
