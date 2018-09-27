import React, { Component } from 'react';
import {
  View, StyleSheet, Animated, Dimensions, InteractionManager, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import I18n from 'react-native-i18n';
import Text from '../../components/Text';
import { Colors } from '../../themes';
import { dismissInAppNoti } from '../../navigation/navigationActions';

const isIphoneX = DeviceInfo.getModel()
  .toLocaleLowerCase()
  .search('iphone x') > -1;

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animation = new Animated.Value(height);
  }

  componentDidMount() {
    this.toggleNotiAnim();
  }

  toggleNotiAnim = (isShow = true) => {
    const handle = InteractionManager.createInteractionHandle();
    Animated.timing(this.animation, {
      toValue: isShow ? (isIphoneX ? 90 : 70) : height,
      useNativeDriver: true,
      duration: 300,
    }).start(() => {
      InteractionManager.clearInteractionHandle(handle);
      if (!isShow) {
        dismissInAppNoti();
      } else {
      }
    });
  };

  render() {
    const { title, content, type } = this.props;
    return (
      <Animated.View
        style={[
          styles.wrapperView,
          {
            transform: [{ translateY: this.animation }],
          },
        ]}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          this.containerHeight = height;
        }}
      >
        <View style={styles.container}>
          <Text type="title30PX" color={Colors.primaryText} style={styles.title}>
            {I18n.t('filter.recently')}
          </Text>
          <Text style={styles.content}>Da Nang</Text>
          <Text style={styles.content}>Ha Noi</Text>
        </View>
      </Animated.View>
    );
  }
}

SearchResults.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

SearchResults.defaultProps = {};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapperView: {
    width,
    height: isIphoneX ? height - 100 : height - 60,
    backgroundColor: Colors.default,
  },
  container: {
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    paddingBottom: 10,
  },
  content: {
    paddingTop: 5,
  },
});

export default SearchResults;
