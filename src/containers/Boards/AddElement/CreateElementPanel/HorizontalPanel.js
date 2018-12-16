import React from 'react'
import { Row, Col, Alert, Card, CardBody, Input, Button } from 'reactstrap'

import styles from './ElementPanel.module.css'

export default function HorizontalPanel({
  nameElement,
  handlerChangeInput,
  isEmpty,
  handlerAddElement,
  handlerCancel
}) {
  return (
    <Col md={12}>
      <Alert color="info">
        <Row>
          <Col md={8}>
            <Input onChange={handlerChangeInput} type="text" />
          </Col>
          <Col md={2}>
            <Button
              disabled={isEmpty}
              onClick={handlerAddElement}
              className={`${styles.buttonHorizontal}`}
              color="info"
            >
              {`Add ${nameElement}`}
            </Button>{' '}
          </Col>
          <Col md={2}>
            {' '}
            <Button onClick={handlerCancel} className={`${styles.buttonHorizontal}`} color="dark">
              Cancel
            </Button>
          </Col>
        </Row>
      </Alert>
    </Col>
  )
}
