import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { Colors } from '../../themes/index';

const styles = StyleSheet.create({
  contentMarker: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 4,
    backgroundColor: 'transparent',
  },
  markerIcon: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 4,
    backgroundColor: 'transparent',
    fontSize: 55,
    color: Colors.default,
  },
  marker: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: 32,
    height: 32,
    borderRadius: 18,
  },
});

const Marker = ({ animation, duration, image }) => {
  return (
    <Animatable.View animation={animation} duration={duration} style={styles.contentMarker}>
      <Icon name="md-pin" style={styles.markerIcon} />
      <Image source={{ uri: image }} style={styles.marker} />
    </Animatable.View>
  );
};

Marker.propTypes = {
  image: PropTypes.string,
  animation: PropTypes.string,
  duration: PropTypes.number,
};

Marker.defaultProps = {
  duration: 300,
};

export default Marker;
