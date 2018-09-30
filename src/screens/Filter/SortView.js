import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes/index';
import Text from '../../components/Text';

const styles = {
  container: {
    paddingVertical: 20,
    paddingTop: 0,
    marginHorizontal: 20,
    backgroundColor: Colors.default,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightDivider,
  },
  listSort: {
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
    fontSize: 40,
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

const SortItem = props => {
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

const SortView = ({ sort, onPress }) => {
  const items = [
    {
      id: 'price',
      name: I18n.t('filter.price'),
      icon: 'logo-usd',
      isSelected: sort && sort.price,
    },
    {
      id: 'rating',
      name: I18n.t('filter.rating'),
      icon: 'md-star-half',
      isSelected: sort && sort.rating,
    },
  ];
  return (
    <View style={styles.container}>
      <Text type="headline">{I18n.t('filter.sort')}</Text>
      <View style={styles.listSort}>
        <SortItem data={items[0]} onPress={onPress} />
        <SortItem data={items[1]} onPress={onPress} />
      </View>
    </View>
  );
};

SortView.propTypes = {
  sort: PropTypes.object,
  onPress: PropTypes.func,
};

export default SortView;
