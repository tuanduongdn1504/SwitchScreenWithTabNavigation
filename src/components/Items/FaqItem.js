import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
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
    flex: 2,
  },
  subTitle: {
    color: Colors.primaryTextBlur,
    flex: 3,
    marginRight: 6,
    textAlign: 'right',
  },
  icon: {
    color: Colors.primary,
    fontSize: 16,
  },
};

const SettingItem = ({
  noBottomBorder, title, color, collapsed,
}) => {
  const icon = collapsed ? 'ios-arrow-down' : 'ios-arrow-up';
  return (
    <View
      style={[
        styles.container,
        noBottomBorder && {
          borderBottomWidth: 0,
          borderBottomColor: Colors.primaryText,
        },
      ]}
    >
      <Text type="body2Bold" style={[styles.txtTitle, { color }]}>
        {title}
      </Text>
      <Icon name={icon} style={styles.icon} />
    </View>
  );
};

SettingItem.propTypes = {
  noBottomBorder: PropTypes.bool,
  title: PropTypes.string,
  collapsed: PropTypes.bool,
  color: PropTypes.string,
};

export default SettingItem;
