import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableWithoutFeedback, Image, StyleSheet, Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default class MapView extends Component {
  static propTypes = {
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props;
    const { latitude, longitude } = location;
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7Clabel:S%7C${latitude},${longitude}&center=${latitude},${longitude}&zoom=12&size=${width.toFixed(
      0,
    )}x350&key=AIzaSyB1A8FbqoXQ_ePJk0Fp9OjuJSeL8u_zmAE`;
    return (
      <View style={styles.vMap}>
        <Image style={styles.staticMap} source={{ uri: mapUrl }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  vMap: {
    width,
    height: 300,
    zIndex: -2,
  },
  staticMap: {
    width,
    height: 300,
    position: 'absolute',
    // marginTop: -60,
    zIndex: -99,
  },
});
