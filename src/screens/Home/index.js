import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, FlatList, Dimensions, Animated, PanResponder,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { push, showModal } from '../../navigation/navigationActions';
import { close, chat } from '../../navigation/navigationButtons';
import { getDataArr } from '../../redux/crudCreator/selectors';
import TutorActions from '../../redux/TutorRedux/actions';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import HomeItem from '../../components/Items/HomeItem';
import Divider from '../../components/Divider';
import Maps from '../../components/Maps';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import { FILTER } from '../../localData';
import FilterBar from './FilterBar';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: {},
    };
    this.animated = new Animated.Value(300);
    this.y= 300;
    this.initPanResponder();
  }

  componentDidMount() {
    const { getTutors } = this.props;
    getTutors();
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
        // this.animated.setOffset(this.y);
      },
      onPanResponderMove: (e, gestureState) => {
        // custom logic here
        console.log('JSON.stringifye', JSON.stringify(gestureState.moveY));
        Animated.event([null, {
          moveY: this.animated,
        }])(e, gestureState); // <<--- INVOKING HERE!
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        this.y = this.animated._value;
        console.log('JSON.stringifye', JSON.stringify(this.y ));
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

  onPressItem(item) {
    this.props.getOneTutor(item);
    push(this.props.componentId, 'detail', {
      title: I18n.t('tutorDetail'),
      rightButtons: [chat()],
    });
  }

  onPressMarker = item => {
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
      inputRange: [0,200, height],
      outputRange: [40, 40, height- 200]
    })
    return (
      <Container style={styles.container}>
        <CheckUpdate />
        <Animated.View style={[styles.vMap, {height: animatedHeight}]}>
          {/* <Maps
            markers={tutors}
            selectedMarker={selectedMarker}
            onPressMarker={this.onPressMarker}
          /> */}
        </Animated.View>
        <FilterBar />
        <View style={{ flex: 1 }}>
          <View style={styles.space} />
          <FlatList
            style={styles.list}
            extraData={isUpdate}
            data={tutors}
            renderItem={this.renderItem}
            keyExtractor={data => data.objectId}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ItemSeparatorComponent={() => <Divider />}
            ListFooterComponent={() => <View style={{ width: 20 }} />}
            ListHeaderComponent={() => <View style={{ height: 30 }} />}
          />
          <View style={styles.vHeaderList} {...this.panResponder.panHandlers}>
            <View style={styles.vLinePrimary} />
          </View>
        </View>
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
  item: {
    backgroundColor: 'transparent',
  },
  textButton: {
    color: Colors.primaryText,
  },
  space: {
    height: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: Colors.default,
  },
  vMap: {
    height: (height * 2) / 5,
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
});

function mapStateToProps(state) {
  return {
    tutors: getDataArr(state, 'tutor'),
    loading: state.tutor.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTutors: () => dispatch(TutorActions.getAllTutor()),
    getOneTutor: data => dispatch(TutorActions.getOneTutor(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
