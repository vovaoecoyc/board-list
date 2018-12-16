import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { addElement } from '../../../../store/actions'
import HorizontalPanel from './HorizontalPanel'

class CreateElementPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEmpty: true,
      name: ''
    }
  }
  handlerAddElement = () => {
    let borderId = this.props.match.params.id ? this.props.match.params.id : null,
      borderDBId = null
    this.props.dataBoards.forEach((board, index) => {
      if (+borderId - 1 === +index) {
        borderDBId = board.id
      }
    })
    this.props.addPanelCallback()
    this.props.addElement(this.state.name, this.props.idUser, this.props.typeAction, borderDBId)
  }
  handlerCancel = () => {
    this.props.addPanelCallback()
  }
  handlerChangeInput = e => {
    let value = e.target.value
    value ? this.setState({ isEmpty: false, name: value }) : this.setState({ isEmpty: true })
  }
  render() {
    return (
      <HorizontalPanel
        nameElement={this.props.nameElement}
        handlerChangeInput={this.handlerChangeInput}
        isEmpty={this.state.isEmpty}
        handlerAddElement={this.handlerAddElement}
        handlerCancel={this.handlerCancel}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addElement: (name, idUser, typeAction, boardDBId = null) => {
    dispatch(addElement(name, idUser, typeAction, boardDBId))
  }
})

const mapStateToProps = state => ({
  idUser: state.auth.idUser,
  dataBoards: state.boards.dataBoards
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateElementPanel)
)
