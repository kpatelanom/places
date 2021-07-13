import React, {Component} from 'react';
import {TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class MenuButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <Image
          source={require('./../assets/image/menu.png')}
          style={{height: 30, width: 30, marginRight: 15}}
        />
      </TouchableOpacity>
    );
  }
}
