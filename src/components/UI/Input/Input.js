import React from 'react'

import classes from './Input.module.scss'

const Input = (props) => {
  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement]


  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid)
  }

  if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>;
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={inputClasses.join(' ')} { ...props.elementConfig } onChange={props.changed} value={props.value} />
      break;
    case ('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')} { ...props.elementConfig } onChange={props.changed} value={props.value} />
      break;
    case ('select'):
      inputElement = (
        <select 
          className={inputClasses.join(' ')}
          onChange={props.changed}
          value={props.value}>
          {props.elementConfig.options.map(option => (
            <option key={option.name} value={option.value}>{option.name}</option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input className={classes.InputElement} { ...props.elementConfig } value={props.value} />
  }
  
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  )
}

export default Input