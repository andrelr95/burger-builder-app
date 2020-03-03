import React, { Component } from 'react'
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { purchaseBurger } from '../../../store/actions'

import classes from './ContactData.module.scss'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        valueType: 'name',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        valueType: 'street',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your zip code'
        },
        valueType: 'zip code',
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        valueType: 'country',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your email'
        },
        valueType: 'email',
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', name: 'Fastest' },
            { value: 'cheapest', name: 'Cheapest' }
          ]
        },
        value: 'fastest',
        valid: true,
        validation: {}
      },
    },
    formIsValid: false
  }

  orderHandler = (e) => {
    e.preventDefault()
    this.setState({ loading: true });
    const formData = {}

    for (let formElementIndentifier in this.state.orderForm) {
      formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.tPrice,
      orderData: formData
    };

    this.props.onSubmitOrder(order)

    // axios
    //   .post('/orders.json', order)
    //   .then(response => {
    //     this.setState({ loading: false });
    //     this.props.history.push('/')
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false });
    //   });
  }
  
  inputChangeHandler = (e, inputIndentifier) => {
    const updatedOrderForm = { ...this.state.orderForm }
    const updatedFormElement = { ...updatedOrderForm[inputIndentifier] }

    updatedFormElement.value = e.target.value
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true

    updatedOrderForm[inputIndentifier] = updatedFormElement

    let formIsValid = true

    for (let inputIndentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid
    }
    
    this.setState({ orderForm: updatedOrderForm, formIsValid })
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
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: {...this.state.orderForm[key]}
      })
    }


    let form = (
      <form onSubmit={this.orderHandler}>
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
        <Button 
          btnType="Success"
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
        >ORDER</Button>
      </form>
    )
    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    loading: state.order.loading,
    tPrice: state.burgerBuilder.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmitOrder: (order) => dispatch(purchaseBurger(order))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactData)