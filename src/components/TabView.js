import React, { Component, ViewPropTypes } from 'react';
import {
  StyleSheet, Text, View, Animated, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

const Button = props => {
  return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
};

export default class TabView extends Component {
  static propTypes = {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
    style: ViewPropTypes.style,
    scrollValue: PropTypes.object,
  };

  static defaultProps = {
    activeTextColor: 'navy',
    inactiveTextColor: 'black',
    backgroundColor: null,
  };

  renderTabOption(name, page) {}

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <Button
        style={{ flex: 1 }}
        key={name}
        accessible
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => onPressHandler(page)}
      >
        <View style={[styles.tab, this.props.tabStyle]}>
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>{name}</Text>
        </View>
      </Button>
    );
  }

  render() {
    const {
      containerWidth,
      tabs,
      scrollValue,
      backgroundColor,
      style,
      activeTab,
      underlineStyle,
      goToPage,
      renderTab,
    } = this.props;
    // const containerWidth = this.props.containerWidth;
    const numberOfTabs = tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const translateX = scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View style={[styles.tabs, { backgroundColor }, style]}>
        {tabs.map((name, page) => {
          const isTabActive = activeTab === page;
          const renderTabBar = renderTab || this.renderTab;
          return renderTabBar(name, page, isTabActive, goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [{ translateX }],
            },
            underlineStyle,
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});
