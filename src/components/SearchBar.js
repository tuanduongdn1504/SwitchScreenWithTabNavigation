import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  TouchableHighlight,
  Dimensions,
  Animated,
  Platform,
  StyleSheet,
} from 'react-native';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes/index';

const AnimatedTextinput = Animated.createAnimatedComponent(TextInput);

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
    this.animationValue = new Animated.Value(0);
    this.toggle = this.toggle.bind(this);
    this.input = React.createRef();
  }

  isShow() {
    const { isShow } = this.state;
    return isShow;
  }

  toggle() {
    const { isShow } = this.state;
    this.input.blur && this.input.blur();
    this.setState({ isShow: !isShow });
    Animated.timing(this.animationValue, {
      toValue: isShow ? 0 : 1,
      duration: 400,
    }).start(() => {
      this.input.focus && this.input.focus();
    });
  }

  render() {
    const { onChange } = this.props;
    const { isShow } = this.state;
    const paddingHorizontal = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15],
    });
    const widthContainer = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [50, width],
    });
    const widthInput = this.animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, width - 100],
    });

    const opacity = this.animationValue.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [0, 0, 0, 1],
    });
    const widthCancel = this.animationValue.interpolate({
      inputRange: [0, 0.25, 0.75, 1],
      outputRange: [0, 0, 50, 50],
    });

    return (
      <Animated.View style={[styles.container, { width: widthContainer }]}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => this.toggle()}
          style={styles.vicon}
        >
          <Animated.View style={styles.center}>
            <Icon name="md-search" size={20} style={styles.icon} />
          </Animated.View>
        </TouchableHighlight>
        <AnimatedTextinput
          onChange={event => {
            onChange && onChange(event.nativeEvent.text);
          }}
          ref={ref => {
            if (ref) {
              this.input = ref.getNode();
            }
          }}
          editable={isShow}
          style={[styles.searchInput, { width: widthInput, paddingHorizontal, opacity }]}
        />
        <TouchableHighlight
          style={styles.center}
          underlayColor="transparent"
          onPress={() => this.toggle()}
        >
          <Animated.View style={[styles.vCancel, { width: widthCancel }]}>
            <Animated.Text style={[styles.text, { opacity }]}>
              {I18n.t('button.cancel')}
            </Animated.Text>
          </Animated.View>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

Search.propTypes = {
  onChange: PropTypes.func,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 38,
    width: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    right: 0,
    top: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  searchInput: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 15,
    fontSize: 17,
    height: Platform.OS === 'ios' ? 30 : 40,
    backgroundColor: 'white',
  },
  center: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  vicon: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  vCancel: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  icon: {
    color: Colors.primaryText,
    textAlign: 'center',
  },
});
