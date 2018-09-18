import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native';



export default class CollapseView extends Component {
  static propTypes = {
    renderView: PropTypes.func.isRequired,
    renderCollapseView: PropTypes.func.isRequired,
    collapse: PropTypes.bool,
    tension: PropTypes.number,
  };

  static defaultProps = {
    collapse: false,
    tension: 10,
  };
  constructor(props) {
    super(props);
    const { collapse } = this.props;
    this.state = {
      collapse,
      animation: new Animated.Value(),
    };
  }

  collapse = () => {
    const { startpoint, endpoint, animation, collapse } = this.state;
    const startAnim = collapse ? endpoint + startpoint : startpoint;
    const endAnim = collapse ? startpoint : startpoint + endpoint;
    this.setState({
      collapse: !collapse,
    });

    animation.setValue(startAnim);
    const { tension } = this.props;
    Animated.spring(animation, {
      toValue: endAnim,
      tension,
    }).start();
  };

  startpoint = layout => {
    const { collapse } = this.state;
    if (!collapse) {
      this.setState({
        animation: new Animated.Value(layout.nativeEvent.layout.height),
      });
    this.setState({
      startpoint: layout.nativeEvent.layout.height,
    });
  };

  endpoint = layout => {
    const { collapse } = this.state;
    if (collapse)
      this.setState({
        animation: new Animated.Value(layout.nativeEvent.layout.height),
      });
    this.setState({
      endpoint: layout.nativeEvent.layout.height,
    });
  };

  render= () => {
    const {renderView, renderCollapseView } = this.props;
    return (
      <Animated.View
        style={{
          height: animation,
          backgroundColor: 'transparent',
          overflow: 'hidden',
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.collapse}
          onLayout={this.startpoint}
        >
          {renderView(collapse)}
        </TouchableOpacity>
        <View onLayout={this.endpoint}>
          {renderCollapseView(collapse)}
        </View>
      </Animated.View>
    );
  }
}
