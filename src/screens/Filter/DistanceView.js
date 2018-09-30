import React from 'react';
import PropTypes from 'prop-types';
import { View, Slider } from 'react-native';
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

const DistanceView = ({ value, onSetFilter }) => {
  return (
    <View style={styles.container}>
      <Text type="headline">{I18n.t('filter.distance')}</Text>
      <Text type="body3" style={styles.vValue}>{`${value} KM`}</Text>
      <Slider
        onValueChange={e => onSetFilter({ distance: e })}
        step={1}
        value={value}
        minimumValue={1}
        maximumValue={20}
        maximumTrackTintColor={Colors.lightDivider}
        minimumTrackTintColor={Colors.primary}
      />
    </View>
  );
};

DistanceView.propTypes = {
  value: PropTypes.number,
  onSetFilter: PropTypes.func,
};
DistanceView.defaultProps = {
  value: 1,
};

export default DistanceView;
