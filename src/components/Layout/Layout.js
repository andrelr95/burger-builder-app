import React from 'react';

import Lux from '../../hoc/Lux';
import classes from './Layout.module.scss';

const layout = props => (
  <Lux>
    <div>Toolbar, SideDrower and Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Lux>
);

export default layout;