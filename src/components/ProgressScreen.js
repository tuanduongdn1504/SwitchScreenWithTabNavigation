import React from 'react';
import {
  View, StyleSheet, ActivityIndicator, Dimensions,
} from 'react-native';

const ProgressScreen = ({ componentId, onDisplay }) => {
  return (
    <View style={styles.vProgress}>
      <ActivityIndicator />
    </View>
  );
};

ProgressScreen.propTypes = {};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  vProgress: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 10, 10, 0.4)',
  },
});

export default ProgressScreen;
