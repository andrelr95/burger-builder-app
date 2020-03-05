import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.scss'


export class Auth extends Component {

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
    }
  }

  inputChangeHandler = (e, inputIndentifier) => {
    const updatedControls = { ...this.state.controls }
    const updatedFormElement = { ...updatedControls[inputIndentifier] }

    updatedFormElement.value = e.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true

    updatedControls[inputIndentifier] = updatedFormElement

    let formIsValid = true

    for (let inputIndentifier in updatedControls) {
      formIsValid = updatedControls[inputIndentifier].valid && formIsValid
    }
    
    this.setState({ controls: updatedControls, formIsValid })
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
        <form>
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
          <Button btnType="Success" clicked={console.log('clicked')}>LOGIN</Button>
        </form>
      </div>
    )
  }

}