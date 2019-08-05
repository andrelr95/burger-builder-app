import React, { Component } from 'react';

import Lux from '../../hoc/Lux';
import classes from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <Lux>
        <Toolbar />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Lux>
    );
  }
}

export default Layout;
