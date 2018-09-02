import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/icomoon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, StyleSheet } from 'react-native';
import Touchable from './Touchable';
import Text from './Text';
import Colors from '../themes/Colors';

const Button = ({
  center,
  primary,
  secondary,
  transparent,
  style,
  disabled,
  icon,
  ionicons,
  iconColor,
  iconSize,
  iconStyle,
  fontAwesome,
  textStyle,
  buttonTitle,
  loading,
  onPress,
}) => {
  const innerView = (
    <View
      style={[
        styles.buttonWithText,
        center && styles.center,
        primary && { backgroundColor: Colors.primary },
        secondary && { backgroundColor: Colors.secondary },
        transparent && { backgroundColor: 'transparent' },
        style,
        disabled && styles.disabledBtt,
      ]}
    >
      {icon ? (
        <Icon
          name={icon}
          color={iconColor || Colors.primary}
          size={iconSize || 25}
          style={[{ marginRight: 10 }, iconStyle]}
        />
      ) : null}
      {ionicons ? (
        <Ionicons
          name={ionicons}
          color={iconColor || Colors.primary}
          size={iconSize || 25}
          style={[{ marginRight: 10 }, iconStyle]}
        />
      ) : null}
      {fontAwesome ? (
        <FontAwesome
          name={fontAwesome}
          color={iconColor || Colors.primary}
          size={iconSize || 25}
          style={[{ marginRight: 10 }, iconStyle]}
        />
      ) : null}
      <Text
        type="normalBold"
        style={[styles.buttonText, textStyle, disabled && { color: `${Colors.default}60` }]}
      >
        {buttonTitle}
      </Text>
    </View>
  );
  if (loading || disabled) return innerView;
  return <Touchable onPress={onPress}>{innerView}</Touchable>;
};

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  transparent: PropTypes.bool,
  center: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.any,
  icon: PropTypes.string,
  ionicons: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  iconStyle: PropTypes.any,
  fontAwesome: PropTypes.string,
  textStyle: PropTypes.any,
};

Button.defaultProps = {
  center: true,
};

export default Button;

const styles = StyleSheet.create({
  buttonWithText: {
    marginTop: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.blur,
  },
  center: {
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
  },
  disabledBtt: {
    backgroundColor: Colors.blur,
  },
});
