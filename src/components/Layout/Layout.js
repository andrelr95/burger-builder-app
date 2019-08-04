import React from 'react';

import Lux from '../../hoc/Lux';
import classes from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = props => (
  <Lux>
    <Toolbar />
    <div>Toolbar, SideDrower and Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Lux>
);

export default layout;