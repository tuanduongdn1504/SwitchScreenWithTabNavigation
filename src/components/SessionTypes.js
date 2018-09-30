import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/tutor';
import I18n from 'react-native-i18n';
import { Colors } from '../themes/index';
import Text from './Text';

const styles = {
  container: {
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.default,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightDivider,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vItem: {
    marginTop: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.secondaryText,
    fontSize: 50,
  },
  txtName: {
    color: Colors.secondaryText,
    fontSize: 13,
    backgroundColor: 'transparent',
    marginTop: 12,
  },
  txtMedium: {},
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const SessionTypesItem = props => {
  return (
    <TouchableOpacity style={styles.vItem} onPress={() => props.onPress(props.data)}>
      <View style={styles.center}>
        <Icon
          name={props.data.icon}
          style={[styles.icon, props.data.isSelected && { color: Colors.primary }]}
        />
        <Text style={[styles.txtName, props.data.isSelected && { color: Colors.primary }]}>
          {props.data.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const SessionTypes = ({ session_types, onPress, isSignupTutor }) => {
  const items = [
    {
      id: 'Online',
      name: I18n.t('userInfo.tutor.types.online'),
      icon: 'online-tutor',
      isSelected: session_types && session_types.Online,
    },
    {
      id: 'Person',
      name: I18n.t('userInfo.tutor.types.offline'),
      icon: 'tutor',
      isSelected: session_types && session_types.Person,
    },
  ];
  return (
    <View
      style={[
        styles.container,
        isSignupTutor && { borderBottomWidth: 0, marginHorizontal: 0, paddingTop: 0 },
      ]}
    >
      <Text type="headline">{I18n.t('filter.session_types')}</Text>
      <View style={styles.row}>
        <SessionTypesItem onPress={onPress} data={items[0]} />
        <SessionTypesItem onPress={onPress} data={items[1]} />
      </View>
    </View>
  );
};

SessionTypes.propTypes = {
  session_types: PropTypes.object,
  onPress: PropTypes.func,
  isSignupTutor: PropTypes.bool,
};
SessionTypes.defaultProps = {};

export default SessionTypes;
