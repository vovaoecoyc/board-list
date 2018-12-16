import React, { Component } from 'react'
import { FormGroup, Input, Button, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'

import styles from './AuthForm.module.css'
import PropTypes from 'prop-types'
import helpers from '../../../helpers'
import { registerUser, authUser, clearError } from '../../../store/actions'
import Spinner from '../../../components/Spinner'

class AuthForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      fields: {
        email: {
          name: 'email',
          type: 'email',
          tabIndex: 1,
          placeholder: 'Press E-mail',
          value: localStorage.getItem('email') ? localStorage.getItem('email') : '',
          isNotValid: false,
          displayed: true,
          rules: {
            email: true,
            confirm: false
          }
        },
        password: {
          name: 'password',
          type: 'password',
          placeholder: 'Press password',
          tabIndex: 2,
          value: '',
          isNotValid: false,
          displayed: true,
          rules: {
            confirm: false,
            confirmWith: 'confirmPass',
            minLength: 6
          }
        },
        confirmPass: {
          name: 'confirmPass',
          type: 'password',
          placeholder: 'Confirm the password',
          tabIndex: 3,
          value: '',
          isNotValid: false,
          displayed: this.props.type === 'register',
          rules: {
            confirm: true,
            confirmWith: 'password',
            minLength: 6
          }
        }
      },
      isValidFormLogin: false,
      isValidFormRegister: false,
      error: this.props.error
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.type !== prevState.type) {
      prevState.fields.confirmPass.displayed = nextProps.type === 'register'
      prevState.type = nextProps.type
      for (let key in prevState.fields) {
        prevState.fields[key].isNotValid = false
      }
      if (nextProps.error) nextProps.clearError()
      return {
        ...prevState,
        error: false
      }
    }
    if (nextProps.error !== false) {
      return { ...prevState, error: nextProps.error }
    }
    return null
  }
  handlerClickLogin = () => {
    let email = this.state.fields.email.value,
      password = this.state.fields.password.value
    this.props.authUser(email, password, this.props.history)
  }
  handlerClickRegister = () => {
    if (this.state.fields.password.value === this.state.fields.confirmPass.value) {
      let email = this.state.fields.email.value,
        password = this.state.fields.password.value
      this.props.registerUser(email, password, this.props.history)
    }
  }
  handlerChangeInput = e => {
    let name = e.target.name,
      value = e.target.value
    if (e.target.name === 'email') {
      localStorage.setItem('email', value)
    }
    this.setState(state => {
      let validFormLogin = [],
        validFormRegister = []
      for (let field in state.fields) {
        if (state.fields[field].value.length <= 0) {
          state.fields[field].isNotValid = true
        }
        if (state.fields[field].name === name && state.fields[field].displayed) {
          state.fields[field].value = value
        }
        let validValue = helpers.checkValidateInput(state.fields[field], state.fields[field].value, state.fields)
        state.fields[field].isNotValid = validValue ? false : true
        if (state.fields[field].name === 'email' || state.fields[field].name === 'password') {
          state.fields[field].isNotValid ? validFormLogin.push(false) : validFormLogin.push(true)
        }
        validFormRegister.push(state.fields[field].isNotValid)
      }
      state.isValidFormLogin = validFormLogin.every(value => {
        return value === true
      })
      state.isValidFormRegister = validFormRegister.every(value => {
        return value === false
      })
      return state
    })
  }
  render() {
    let inputFields = []
    for (let key in this.state.fields) {
      if (this.state.fields[key].displayed) {
        inputFields.push(this.state.fields[key])
      }
    }
    let inputs = inputFields.map(field => {
      if (field.displayed) {
        return (
          <Input
            defaultValue={field.value}
            onChange={this.handlerChangeInput}
            className={`${styles.mbInput}`}
            key={field.name}
            type={field.type}
            name={field.name}
            tabIndex={field.tabIndex}
            placeholder={field.placeholder}
            invalid={field.isNotValid}
          />
        )
      }
    })
    return this.props.loading ? (
      <Spinner />
    ) : (
      <form>
        <FormGroup className={`text-center justify-content-center ${styles.form}`}>
          {inputs}
          {this.state.error ? <Alert color="danger">{this.state.error}</Alert> : ''}
          {this.props.type === 'register' ? (
            <Button disabled={!this.state.isValidFormRegister} onClick={this.handlerClickRegister} color="primary">
              Register
            </Button>
          ) : (
            <Button disabled={!this.state.isValidFormLogin} onClick={this.handlerClickLogin} color="primary">
              Log In
            </Button>
          )}
        </FormGroup>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  registerUser: (userEmail, password, routeHistory) => {
    dispatch(registerUser(userEmail, password, routeHistory))
  },
  authUser: (login, password, routeHistory) => {
    dispatch(authUser(login, password, routeHistory))
  },
  clearError: () => {
    dispatch(clearError())
  }
})

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm)
