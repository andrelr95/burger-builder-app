import React from 'react';

import classes from './Modal.module.scss';
import Lux from '../../../hoc/Lux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => (
  <Lux>
    <Backdrop clicked={props.modalClosed} show={props.show} />
    <div 
      className={classes.Modal}
      style={{ 
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
      >
      {props.children}
    </div>
  </Lux>
)

export default Modal;