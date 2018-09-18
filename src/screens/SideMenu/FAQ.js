import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import CollapseView from '../../components/CollapseView';

export default class FAQ extends Component {
  state = {};

  renderView = collapse => {
    return (
      <View style={styles.view}>
        <Text>{collapse ? 'Toggle on' : 'Toggle off'}</Text>
      </View>
    );
  };

  renderCollapseView = collapse => {
    return (
      <View style={styles.collapseView}>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <CollapseView
          renderView={this.renderView}
          renderCollapseView={this.renderCollapseView}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009688',
  },
  view: {
    height: 50,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  collapseView: {
    padding: 20,
  },
  // iconView: {
  //   padding: 20,
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#ffffff',
  // },
});
