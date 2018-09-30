import React, { Component } from 'react';
import {
  StyleSheet, ViewPropTypes, TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/tutor';

const propTypes = {
  buttonStyle: ViewPropTypes.style,
  disabled: PropTypes.bool.isRequired,
  halfStarEnabled: PropTypes.bool.isRequired,
  rating: PropTypes.number.isRequired,
  reversed: PropTypes.bool.isRequired,
  starColor: PropTypes.string.isRequired,
  starIconName: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
    .isRequired,
  starSize: PropTypes.number.isRequired,
  starStyle: ViewPropTypes.style,
  onStarButtonPress: PropTypes.func.isRequired,
};

const defaultProps = {
  buttonStyle: {},
  starStyle: {},
};

class StarButton extends Component {
  constructor(props) {
    super(props);

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress(event) {
    const {
      halfStarEnabled, starSize, rating, onStarButtonPress,
    } = this.props;

    let addition = 0;

    if (halfStarEnabled) {
      const isHalfSelected = event.nativeEvent.locationX < starSize / 2;
      addition = isHalfSelected ? -0.5 : 0;
    }

    onStarButtonPress(rating + addition);
  }


  renderIcon() {
    const {
      reversed, starColor, starIconName, starSize, starStyle,
    } = this.props;

    const newStarStyle = {
      transform: [
        {
          scaleX: reversed ? -1 : 1,
        },
      ],
      ...StyleSheet.flatten(starStyle),
    };

    return <Icon name={starIconName} size={starSize} color={starColor} style={newStarStyle} />;
  }

  render() {
    const { buttonStyle, disabled } = this.props;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        disabled={disabled}
        onPress={this.onButtonPress}
        style={buttonStyle}
      >
        {this.renderIcon()}
      </TouchableHighlight>
    );
  }
}

StarButton.propTypes = propTypes;
StarButton.defaultProps = defaultProps;

export default StarButton;
