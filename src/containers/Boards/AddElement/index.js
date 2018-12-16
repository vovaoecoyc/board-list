import React, { Component, Fragment } from 'react'

import CreateElement from './CreateElement'
import CreateElementPanel from './CreateElementPanel'
import * as actionsType from '../../../store/actions/actionsType'

class AddElement extends Component {
  constructor(props) {
    super(props)
    switch (this.props.typeAction) {
      case actionsType.ADD_BOARD:
        this.nameElement = 'Board'
        break
      case actionsType.ADD_LIST_TO_BOARD:
        this.nameElement = 'List'
        break
      default:
        this.nameElement = ''
        break
    }
    this.state = {
      addPanel: false
    }
  }

  handlerAddPanel = () => {
    this.setState(state => {
      state.addPanel = !state.addPanel
      return state
    })
  }
  render() {
    return (
      <Fragment>
        {this.state.addPanel ? (
          <CreateElementPanel
            typeAction={this.props.typeAction}
            nameElement={this.nameElement}
            addPanelCallback={this.handlerAddPanel}
          />
        ) : (
          <CreateElement
            typeAction={this.props.typeAction}
            nameElement={this.nameElement}
            addPanelCallback={this.handlerAddPanel}
          />
        )}
      </Fragment>
    )
  }
}

export default AddElement
