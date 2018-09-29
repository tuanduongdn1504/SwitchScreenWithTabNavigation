import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/tutor';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import DeviceInfo from 'react-native-device-info';
import Profile from './Profile';
import { Colors } from '../../themes';
import TutorsActions from '../../redux/TutorsRedux/actions';
import Text from '../../components/Text';
import StarRating from '../../components/StarRating';
import Button from '../../components/Button';
import ProfileList from './ProfileList';
import ReviewList from './ReviewList';
import { showModal } from '../../navigation/navigationActions';
import { close } from '../../navigation/navigationButtons';

const { width } = Dimensions.get('window');

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [{ key: 'first', title: 'Information' }, { key: 'second', title: 'Reviews' }],
    };
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const { getOneTutors, item } = this.props;
    getOneTutors(item);
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'review') {
      showModal('review', {
        leftButtons: [close()],
      });
    }
  };

  renderLabel = props => {
    let index = 0;
    return ({ route }) => {
      const focused = index === props.navigationState.index;
      index += 1;
      return (
        <View style={{ paddingVertical: 15 }}>
          <Text
            type="body2"
            style={[styles.labelStyle, focused ? styles.labelSelectedStyle : null]}
          >
            {route.title}
          </Text>
        </View>
      );
    };
  };

  renderTabBar = props => (
    <TabBar
      {...props}
      labelStyle={{ color: Colors.primary }}
      pressColor="#fff"
      renderLabel={this.renderLabel(props)}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile fullName="Mei Nagano" avatar={global.defaultImage[1]} />
          <View style={styles.center}>
            <View style={[styles.ratingContainer, styles.row]}>
              <StarRating disabled rating={4.5} starSize={16} containerStyle={styles.rating} />
              <Text type="small">(120)</Text>
            </View>
            <View style={[styles.row, styles.location]}>
              <Icon name="marker" size={12} color={Colors.primary} style={{ marginRight: 5 }} />
              <Text type="body3" color={Colors.primary}>
                Osaka, Japan
              </Text>
            </View>
          </View>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: ProfileList,
            second: ReviewList,
          })}
          tabStyle={{ backgroundColor: Colors.default }}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width }}
          renderTabBar={this.renderTabBar}
          useNativeDriver
        />
        <View style={styles.floatBottom}>
          <View style={[styles.container, styles.row, styles.floatBottomInner]}>
            <View style={{ flex: 1 }}>
              <Text type="title2">$100.00</Text>
              <Text type="small">per hour</Text>
            </View>
            <Button
              style={styles.vBtn}
              primary
              onPress={this.beComeTutor}
              buttonTitle={I18n.t('detail.chatWithTutor')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    marginTop: 10,
  },
  rating: {
    marginRight: 5,
  },
  location: {
    marginTop: 10,
  },
  labelStyle: {
    color: Colors.primaryText,
  },
  labelSelectedStyle: {
    color: Colors.primary,
  },
  floatBottom: {
    backgroundColor: Colors.default,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: 'rgba(155, 155, 155, 0.2)',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  floatBottomInner: {
    paddingHorizontal: 20,
    paddingTop: 15,
    marginBottom:
      DeviceInfo.getDeviceName()
        .toLocaleLowerCase()
        .search('iphone x') > -1
        ? 30
        : 15,
  },
  vBtn: {
    height: 40,
    width: 180,
  },
  tabBar: {
    backgroundColor: Colors.default,
    shadowColor: 'rgba(0, 0, 0, 0.06)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 12,
    shadowOpacity: 1,
  },
  indicator: { backgroundColor: Colors.primary, height: 3 },
});

function mapStateToProps(state) {
  return {
    tutor: state.tutors.current,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getOneTutors: data => dispatch(TutorsActions.getOneTutors(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
