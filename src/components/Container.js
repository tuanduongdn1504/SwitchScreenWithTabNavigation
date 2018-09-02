import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import ProgressScreen from './ProgressScreen';
import { Colors } from '../themes';

const Container = ({ children, style, loading }) => {
  return (
    <View style={[styles.container, style]}>
      {children}
      {loading && <ProgressScreen />}
    </View>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  loading: PropTypes.bool,
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: Colors.primary,
  },
});

export default Container;
