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
    fontSize: 30,
    backgroundColor: 'transparent',
  },
  txtValue: {
    fontSize: 17,
    color: Colors.primaryText,
    marginRight: 10,
    flex: 1,
  },
});

export default class LocationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: props.isSelected,
    };
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    // const { isSelected } = this.state;
    const { onPress, item } = this.props;
    // this.setState({ isSelected: !isSelected });
    onPress && onPress(item);
  }

  render() {
    const { noBottomBorder, item, selectedItems } = this.props;
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
          <Text style={styles.txtValue}>{item.location}</Text>
          {selectedItems
            && selectedItems.id === item.id && <Icon name="ios-checkmark" style={styles.icon} />}
        </View>
      </TouchableOpacity>
    );
  }
}

LocationItem.propTypes = {
  noBottomBorder: PropTypes.bool,
  item: PropTypes.object,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
  selectedItems: PropTypes.object,
};
