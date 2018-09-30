import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../themes/index';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.default,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.primary,
    fontSize: 20,
    backgroundColor: 'transparent',
  },
  txtValue: {
    fontSize: 17,
    color: Colors.primaryText,
    marginRight: 10,
    flex: 1,
  },
  vCheckbox: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderColor: Colors.gray,
    borderWidth: 1,
  },
});

export default class FilterCheckboxItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: props.isSelected,
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { onPress, item } = this.props;
    onPress && onPress(item);
  }

  render() {
    const { noBottomBorder, item, selectedItems } = this.props;
    const isSelected = selectedItems && selectedItems[item.id];
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View
          style={[
            styles.container,
            noBottomBorder && {
              borderBottomWidth: 0,
              borderBottomColor: Colors.default,
            },
          ]}
        >
          <Text style={styles.txtValue}>{item.name}</Text>
          <View style={[styles.vCheckbox, isSelected && { borderColor: Colors.primary }]}>
            {isSelected && <Icon name="ios-checkmark" style={styles.icon} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

FilterCheckboxItem.propTypes = {
  noBottomBorder: PropTypes.bool,
  item: PropTypes.object,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
  selectedItems: PropTypes.object,
};
