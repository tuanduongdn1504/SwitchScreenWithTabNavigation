import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import loading from '../assets/loading.json';

class ProgressScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.loading = React.createRef();
  }

  componentDidMount() {
    this.loading.play();
  }

  componentWillUnmount() {
    this.loading.reset();
  }

  render() {
    return (
      <View style={styles.vProgress}>
        <LottieView
          ref={ref => {
            this.loading = ref;
          }}
          source={loading}
          loop
          style={styles.vAnimation}
        />
      </View>
    );
  }
}

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
