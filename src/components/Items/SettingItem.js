import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes/index';
import Text from '../Text';

const styles = {
  container: {
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    color: Colors.primaryText,
    flex: 1,
  },
  icon: {
    color: Colors.primaryText,
    fontSize: 25,
  },
};

const SettingView = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.container,
          props.noBottomBorder && {
            borderBottomWidth: 0,
            borderBottomColor: Colors.primaryText,
          },
        ]}
      >
        <Text
          type={props.bold ? 'body2Bold' : 'body2'}
          style={[styles.txtTitle, props.color && { color: props.color }]}
        >
          {props.title}
        </Text>
        {!props.unShowArrow && <Icon name="ios-arrow-forward" style={styles.icon} />}
      </View>
    </TouchableOpacity>
  );
};

export default SettingView;
