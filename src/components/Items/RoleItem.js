import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Tutor';
import { Colors } from '../../themes/index';
import Text from '../Text';
import Touchable from '../Touchable';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 5,
  },
  txtTitle: {
    color: Colors.default,
  },
  icon: {
    color: Colors.default,
    fontSize: 50,
  },
});

const RoleView = ({ data, onPress, isSelected }) => {
  return (
    <Touchable
      style={[styles.container, isSelected && { backgroundColor: Colors.primary }]}
      onPress={onPress}
    >
      <View style={[styles.content, isSelected && { backgroundColor: Colors.primary }]}>
        <Icon name={data.id} style={styles.icon} />
        <Text type="body2" center style={styles.txtTitle}>
          {data.title}
        </Text>
      </View>
    </Touchable>
  );
};

RoleView.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
};

export default RoleView;
