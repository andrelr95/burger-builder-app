import React, { Component } from 'react';

import Lux from '../../hoc/Lux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
  render() {
    return (
      <Lux>
        <Burger /> 
        <div>Build Controls</div>
      </Lux>
    );
  };
};

export default BurgerBuilder;

