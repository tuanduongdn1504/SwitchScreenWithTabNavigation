/* eslint no-alert: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, FlatList, Dimensions, Animated, PanResponder,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import OneSignal from 'react-native-onesignal';
import { push, showModal } from '../../navigation/navigationActions';
import { close, chat } from '../../navigation/navigationButtons';
import { getDataArr } from '../../redux/crudCreator/selectors';
import TutorsActions from '../../redux/TutorsRedux/actions';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import HomeItem from '../../components/Items/HomeItem';
import Divider from '../../components/Divider';
import Maps from '../../components/Maps';
import { Colors } from '../../themes';
import FilterBar from './FilterBar';
import LocationActions from '../../redux/LocationRedux/actions';
import config from '../../config/AppSetting';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: {},
    };
    this.animated = new Animated.Value(height - 100);
    this.y = height - 100;
    this.initPanResponder();
    // TODO: OneSignal setup
    const { ONE_SIGNAL_APP_ID } = config;
    OneSignal.init(ONE_SIGNAL_APP_ID);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentDidMount() {
    const { getTutors, requestLocation } = this.props;
    getTutors();
    requestLocation();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    alert(`Notification received: ${JSON.stringify(notification)}`);
  }

  onOpened(openResult) {
    alert(`Message: ${JSON.stringify(openResult.notification.payload.body)}
    Data: ${JSON.stringify(openResult.notification.payload.additionalData)}
    isActive: ${JSON.stringify(openResult.notification.isAppInFocus)}
    openResult: ${JSON.stringify(openResult)}`);
  }

  onIds(device) {
    alert(`Device info: ${JSON.stringify(device)}`);
  }

  onPressItem(item) {
    const { componentId } = this.props;
    push(componentId, 'detail', {
      passProps: {
        item,
      },
      rightButtons: [chat()],
      largeTitle: false,
    });
  }

  initPanResponder = () => {
    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (e, gestureState) => {
        // custom logic here
        this.animated.setValue(this.y + gestureState.dy);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.y = this.animated._value;
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  };

  onPressMarker = item => {
    console.log('item', item);
    this.setState({ selectedMarker: item });
  };

  showChatBox = () => {
    showModal('chatBox', {
      title: I18n.t('chatBox'),
      leftButtons: [],
      rightButtons: [close()],
    });
  };

  renderItem = ({ item, index }) => {
    return (
      <HomeItem
        showQR={this.showQR}
        data={item}
        index={index}
        onPress={() => this.onPressItem(item, index)}
      />
    );
  };

  render() {
    const { tutors } = this.props;
    const { isUpdate, selectedMarker } = this.state;
    const animatedHeight = this.animated.interpolate({
      inputRange: [-9999, 0, 200, height, 9999],
      outputRange: [height - 100, height - 100, height - 100, 150, 150],
    });
    return (
      <Container style={styles.container}>
        <CheckUpdate />
        <View style={styles.vMap}>
          <Maps
            markers={tutors}
            selectedMarker={selectedMarker}
            onPressMarker={this.onPressMarker}
          />
        </View>
        <FilterBar />
        <Animated.View style={[styles.vList, { height: animatedHeight }]}>
          <View style={styles.space} />
          <FlatList
            style={styles.list}
            extraData={isUpdate}
            data={tutors}
            keyExtractor={data => data.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ItemSeparatorComponent={() => <Divider />}
            ListFooterComponent={() => <View style={{ width: 20 }} />}
            ListHeaderComponent={() => <View style={{ height: 30 }} />}
          />
          <View style={styles.vHeaderList} {...this.panResponder.panHandlers}>
            <View style={styles.vLinePrimary} />
          </View>
        </Animated.View>
      </Container>
    );
  }
}

Home.propTypes = {
  getTutors: PropTypes.func,
  componentId: PropTypes.string,
  tutors: PropTypes.array,
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  space: {
    height: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: Colors.default,
  },
  vMap: {
    height,
  },
  vHeaderList: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
  },
  vLinePrimary: {
    width: 68,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  vList: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
});

function mapStateToProps(state) {
  return {
    tutors: getDataArr(state, 'tutors'),
    loading: state.tutors.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTutors: () => dispatch(TutorsActions.getAllTutors()),
    requestLocation: () => dispatch(LocationActions.requestLocation()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
