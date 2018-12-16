import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return rest.isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
        // <Redirect to="/login" />
      }}
    />
  )
}

const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized,
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps)(PrivateRoute)
