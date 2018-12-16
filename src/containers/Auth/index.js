import React, { Component } from 'react'
import { Row } from 'reactstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AuthForm from './AuthForm'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let referer = this.props.location.state || { from: { pathname: '/' } }
    return this.props.isAuthorized ? (
      <Redirect to={referer.from.pathname} />
    ) : (
      <Row className="justify-content-center">
        <AuthForm {...this.props} />
      </Row>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized
  }
}

export default connect(
  mapStateToProps,
  null
)(Auth)
