import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes/index';
import Text from '../../components/Text';

const styles = {
  container: {
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.default,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightDivider,
  },
  listSort: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  vItem: {
    flex: 1,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.primaryText,
    fontSize: 20,
  },
  txtName: {
    color: Colors.primaryText,
    fontSize: 13,
    backgroundColor: 'transparent',
    marginTop: 12,
  },
  txtMedium: {},
  vValue: {
    color: Colors.secondaryText,
    marginVertical: 16,
    marginBottom: 10,
  },
};

const AddressView = ({ location, onPress }) => {
  return (
    <View style={styles.container}>
      <Text type="headline">{I18n.t('filter.location')}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text type="body3" style={styles.vValue}>
          {location.location}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

AddressView.propTypes = {
  value: PropTypes.number,
  onPress: PropTypes.func,
};
AddressView.defaultProps = {
  value: 1,
};

export default AddressView;
