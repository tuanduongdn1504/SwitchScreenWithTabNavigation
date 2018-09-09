import React, { Component } from 'react';
import {
  View, StyleSheet, Animated, Dimensions, InteractionManager, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import Text from '../../components/Text';
import { Colors } from '../../themes';
import { dismissInAppNoti } from '../../navigation/navigationActions';

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
      toValue: isShow ? (Platform.os === 'ios' ? 90 : 70) : height,
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
    height: height - 100,
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
