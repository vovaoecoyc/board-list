import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import firebase from './firebase'
import './App.css'

import { setUserAuthenticate, loadingStart, loadingFinish, updateUserId } from './store/actions'
import Auth from './containers/Auth'
import Logout from './containers/Auth/Logout'
import Boards from './containers/Boards'
import Toolbar from './components/TopNavigation/Toolbar/Toolbar'

import PrivateRoute from './components/hoc/PrivateRoute'

class App extends Component {
  constructor(props) {
    super(props)
    this.props.loadingStart()
    firebase.auth().onAuthStateChanged(authenticated => {
      let isAuthorized = authenticated ? true : false
      if (authenticated !== null) {
        this.props.updateUserId(authenticated.uid)
      }
      this.props.loadingFinish()
      if (this.props.isAuthorized !== isAuthorized) {
        this.props.checkAuthUser(authenticated)
      }
    })
  }
  render() {
    const routes = (
      <Switch>
        <PrivateRoute path="/boards" component={Boards} />
        <PrivateRoute exact path="/" component={Boards} />
        <Route path="/login" render={props => <Auth {...props} type="login" />} />
        <Route path="/register" render={props => <Auth {...props} type="register" />} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    )
    return (
      <Fragment>
        <Toolbar />
        <Container>{routes}</Container>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  checkAuthUser: isAuth => {
    dispatch(setUserAuthenticate(isAuth))
  },
  loadingStart: () => {
    dispatch(loadingStart())
  },
  loadingFinish: () => {
    dispatch(loadingFinish())
  },
  updateUserId: userId => {
    dispatch(updateUserId(userId))
  }
})

const mapStateToProps = state => {
  return {
    idUser: state.auth.idUser,
    isAuthorized: state.auth.isAuthorized
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
