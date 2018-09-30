import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/tutor';
import { Colors } from '../../themes/index';

const styles = {
  container: {
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.default,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightDivider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.primaryText,
    fontSize: 18,
  },
  txtValue: {
    color: Colors.secondaryText,
    marginRight: 10,
  },
};

const SortView = ({
  onPress, name, value, noBottomBorder,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          noBottomBorder && { borderBottomWidth: 0, borderBottomColor: Colors.default },
        ]}
      >
        <Text style={[{ flex: 1 }]}>{name}</Text>
        <Text style={styles.txtValue}>{value}</Text>
        <Icon name="right" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

SortView.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  noBottomBorder: PropTypes.bool,
  onPress: PropTypes.func,
};

export default SortView;
