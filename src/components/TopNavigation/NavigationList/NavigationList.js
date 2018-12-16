import React, { Fragment } from 'react'
import { Nav } from 'reactstrap'
import { connect } from 'react-redux'

import NavigationItem from './NavigationItem/NavigationItem'

function NavigationList({ isAuthorized, loading }) {
  let items = (
    <Fragment>
      <NavigationItem link="/login" exact>
        Login
      </NavigationItem>
      <NavigationItem link="/register" exact>
        Register
      </NavigationItem>
    </Fragment>
  )
  if (isAuthorized) {
    items = (
      <Fragment>
        <NavigationItem link="/boards" exact>
          Boards
        </NavigationItem>
        <NavigationItem link="/logout" exact>
          Logout
        </NavigationItem>
      </Fragment>
    )
  }
  return <Nav className="justify-content-center">{loading ? <Fragment /> : items}</Nav>
}

const mapStateToProps = state => {
  return {
    isAuthorized: state.auth.isAuthorized,
    loading: state.auth.loading
  }
}

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(NavigationList)
