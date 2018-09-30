import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Dimensions } from 'react-native';
import FilterCheckboxItem from '../../components/Items/FilterCheckboxItem';
import LocationItem from '../../components/Items/LocationItem';

const { height } = Dimensions.get('window');

export default class SelectedOtherFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onClose = () => {};

  renderItem = ({ item, index }) => {
    const { currentProperty, onSetFilter, selectedItems } = this.props;
    if (currentProperty === 'location') {
      return (
        <LocationItem
          selectedItems={selectedItems}
          onPress={onSetFilter}
          item={item}
          index={index}
        />
      );
    }
    return (
      <FilterCheckboxItem
        selectedItems={selectedItems}
        onPress={onSetFilter}
        item={item}
        index={index}
      />
    );
  };

  render() {
    const { data, selectedItems } = this.props;
    return (
      <FlatList
        style={{ flex: 1, height }}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={data}
        extraData={selectedItems}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        ListFooterComponent={() => {
          return <View style={{ height: 150 }} />;
        }}
      />
    );
  }
}

SelectedOtherFilters.propTypes = {
  data: PropTypes.object,
  currentProperty: PropTypes.string,
  onSetFilter: PropTypes.func,
  selectedItems: PropTypes.object,
};
