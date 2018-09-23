import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import loading from '../assets/loading.json';

const ProgressScreen = () => {
  return (
    <View style={styles.vProgress}>
      <LottieView source={loading} autoPlay loop style={styles.vAnimation} />
    </View>
  );
};

ProgressScreen.propTypes = {
  onDisplay: PropTypes.func,
  componentId: PropTypes.string,
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  vProgress: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  vAnimation: {
    width: 150,
    height: 150,
  },
});

export default ProgressScreen;
