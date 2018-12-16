import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import BoardList from './BoardList'
import BoardItem from './BoardItem'
import { loadBoards } from '../../store/actions'

class BoardsRoot extends Component {
  constructor(props) {
    super(props)
    this.props.loadDataBoards(this.props.idUser)
  }
  render() {
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/boards"
            render={props => {
              return <BoardList dataBoards={this.props.dataBoards} {...props} />
            }}
          />
          <Route
            exact
            path="/"
            render={props => {
              return <BoardList dataBoards={this.props.dataBoards} {...props} />
            }}
          />
          <Route
            exact
            path="/boards/:id"
            render={props => {
              return <BoardItem dataBoards={this.props.dataBoards} {...props} />
            }}
          />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  loadDataBoards: idUser => {
    dispatch(loadBoards(idUser))
  }
})

const mapStateToProps = state => ({
  idUser: state.auth.idUser,
  dataBoards: state.boards.dataBoards
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardsRoot)
