/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/tutor';
import { TabView, TabBar } from 'react-native-tab-view';
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
import { getCurrentData } from '../../redux/crudCreator/selectors';
import { formatMoney } from '../../utils/textUtils';
import { isIPhoneX } from '../../utils/tools';

const { width } = Dimensions.get('window');

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
    this.routes = [{ key: 'first', title: 'Information' }, { key: 'second', title: 'Reviews' }];
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const { getOneTutors, item } = this.props;
    getOneTutors(item);
  }

  navigationButtonPressed = ({ buttonId }) => {
    const { data } = this.props;
    if (buttonId === 'review') {
      showModal('review', {
        leftButtons: [close()],
        passProps: { data },
        largeTitle: false,
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

  renderScene = ({ route }) => {
    const { data } = this.props;
    switch (route.key) {
      case 'first':
        return <ProfileList data={data?.tutor_info?.about} />;
      case 'second':
        return <ReviewList data={data?.reviews} />;
      default:
        return null;
    }
  };

  renderTabView = () => {
    const { index } = this.state;

    return (
      <TabView
        navigationState={{ index, routes: this.routes }}
        renderScene={this.renderScene}
        tabStyle={{ backgroundColor: Colors.default }}
        onIndexChange={idx => this.setState({ index: idx })}
        initialLayout={{ width }}
        renderTabBar={this.renderTabBar}
        useNativeDriver
      />
    );
  };

  render() {
    const { data } = this.props;
    const {
      first_name, last_name, address, tutor_info, avatar, average_rating, reviews,
    } = data;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Profile fullName={`${first_name} ${last_name}`} avatar={avatar} />
          <View style={styles.center}>
            <View style={[styles.ratingContainer, styles.row]}>
              <StarRating
                disabled
                rating={average_rating}
                starSize={16}
                containerStyle={styles.rating}
              />
              <Text type="small">
                {'('}
                {reviews?.length}
                {')'}
              </Text>
            </View>
            <View style={[styles.row, styles.location]}>
              <Icon name="marker" size={12} style={{ marginRight: 5 }} />
              <Text type="body3">{address}</Text>
            </View>
          </View>
        </View>
        {this.renderTabView()}
        <View style={styles.floatBottom}>
          <View style={[styles.container, styles.row, styles.floatBottomInner]}>
            <View style={{ flex: 1 }}>
              <Text type="title2">
                {'$'}
                {formatMoney(tutor_info?.availability?.hourly_rate)}
              </Text>
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
    marginBottom: isIPhoneX ? 30 : 15,
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
    data: getCurrentData(state, 'tutors'),
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
