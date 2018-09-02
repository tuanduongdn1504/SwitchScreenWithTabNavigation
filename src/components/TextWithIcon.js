import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { Colors } from '../themes';

const TextWithIcon = ({
  textColor, text, textType, leftIcon, rightIcon, iconColor, iconSize,
}) => {
  return (
    <View style={styles.container}>
      {leftIcon && <Icon style={styles.icon} name={leftIcon} color={iconColor} size={iconSize} />}
      <Text type={textType} color={textColor}>
        {text}
      </Text>
      {rightIcon && <Icon style={styles.icon} name={rightIcon} color={iconColor} size={iconSize} />}
    </View>
  );
};
TextWithIcon.propTypes = {};

TextWithIcon.defaultProps = {
  iconPosition: 'left',
  textColor: Colors.primaryText,
  iconColor: Colors.primary,
  iconSize: 25,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 35,
  },
});

export default TextWithIcon;
