import React from 'react';
import { Image } from 'react-native';


class MenuIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../images/icons8-menu-26.png')}
        style={{marginRight:10}}
      />
    );
  }
}


export default MenuIcon;
