import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import { auth } from '../../store/actions' 

import classes from './Auth.module.scss'
import { connect } from 'react-redux';


class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address'
        },
        valueType: 'email',
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password'
        },
        valueType: 'password',
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  }

  inputChangeHandler = (e, controlName) => {
    const updatedControls = {
        ...this.state.controls,
        [controlName]: {
          ...this.state.controls[controlName],
          value: e.target.value,
          valid: this.checkValidity(e.target.value, this.state.controls[controlName].validation),
          touched: true
        }
      }
    
    
    this.setState({ controls: updatedControls })
  }

  submitHandler = (event) => {
    const { email, password } = this.state.controls

    event.preventDefault();
    this.props.onAuth(email.value, password.value, this.state.isSignUp)
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp }
    })
  }

  checkValidity = (value, rules) => {
    let isValid = true

    if (!rules) {
      return true
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: {...this.state.controls[key]}
      })
    }

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType} 
              changed={(event) => this.inputChangeHandler(event, formElement.id)}
              elementConfig={formElement.config.elementConfig} 
              value={formElement.config.value}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              valueType={formElement.config.valueType}
              invalid={!formElement.config.valid}
              />
          ))}
          <Button btnType="Success">LOGIN</Button>
        </form>
          <Button btnType="Danger" type="button" clicked={this.switchAuthModeHandler}>SIGN {this.state.isSignUp ? 'UP' : 'IN'}</Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp))
  }
}

export default connect(null, mapDispatchToProps)(Auth);