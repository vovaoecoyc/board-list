import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../../store/actions'

class Logout extends Component {
  constructor(props) {
    super(props)
    this.props.logoutUser()
  }
  render() {
    return <Redirect to="/login" />
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch(logoutUser())
  }
})

export default connect(
  null,
  mapDispatchToProps
)(Logout)
