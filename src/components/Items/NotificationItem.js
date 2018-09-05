import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes/index';
import Text from '../Text';

const Item = ({
  // action
  onPress,
  // state
  title,
  timer,
  bold,
  color,
  unShowArrow,
  noBottomBorder,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View
          style={[
            styles.row,
            noBottomBorder && {
              borderBottomWidth: 0,
              borderBottomColor: Colors.primaryText,
            },
          ]}
        >
          <Text
            type={bold ? 'normalBlack' : 'normalMedium'}
            style={[styles.txtTitle, color && { color }]}
            numberOfLines={3}
          >
            {title}
          </Text>
          {!unShowArrow && <Icon name="ios-arrow-forward" style={styles.icon} />}
        </View>
        <Text type="normalMedium" style={[styles.txtTitle, color && { color }]}>
          {timer}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Item.propTypes = {
  // action
  onPress: PropTypes.func,
  // state
  title: PropTypes.string,
  timer: PropTypes.string,
  bold: PropTypes.bool,
  color: PropTypes.string,
  unShowArrow: PropTypes.bool,
  noBottomBorder: PropTypes.bool,
};

const styles = {
  container: {
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.divider,
  },
  row: {
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

export default Item;
