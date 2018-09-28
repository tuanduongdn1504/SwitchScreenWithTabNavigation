import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/tutor';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Profile from './Profile';
import { Colors } from '../../themes';
import TutorsActions from '../../redux/TutorsRedux/actions';
import Text from '../../components/Text';
// import InputRow from '../../components/InputRow';
// import Button from '../../components/Button';
import StarRating from '../../components/StarRating';

const FirstRoute = () => <View style={[styles.container, { backgroundColor: 'white' }]} />;
const SecondRoute = () => <View style={[styles.container, { backgroundColor: 'white' }]} />;

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
    if (buttonId === 'chat') {
      this.showChatBox();
    }
  };

  showChatBox = () => {
    const { componentId, tutor } = this.props;
    push(componentId, 'chatBox', {
      title: I18n.t('chatBox'),
      passProps: {
        receive: tutor,
      },
    });
  };

  renderLabel(props) {
    let index = 0;
    return ({ route }) => {
      const focused = index === props.navigationState.index;
      index += 1;
      return (
        <View style={{ paddingVertical: 15 }}>
          <Text
            tyoe="body2"
            style={[styles.labelStyle, focused ? styles.labelSelectedStyle : null]}
          >
            {route.title}
          </Text>
        </View>
      );
    };
  }

  renderTabBar = props => (
    <TabBar
      {...props}
      labelStyle={{ color: Colors.primary }}
      // pressColor={Colors.default}
      pressColor="#fff"
      renderLabel={this.renderLabel(props)}
      // tabStyle={{ backgroundColor: Colors.default }}
      style={{
        backgroundColor: Colors.default,
        marginTop: 20,
        shadowColor: 'rgba(0, 0, 0, 0.06)',
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowRadius: 12,
        shadowOpacity: 1,
      }}
      indicatorStyle={{ backgroundColor: Colors.primary, height: 3 }}
    />
  );

  render() {
    // const { tutor } = this.props;
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
                Tokyo, Japan
              </Text>
            </View>
          </View>
        </View>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
          tabStyle={{ backgroundColor: '#fff' }}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={this.renderTabBar}
          useNativeDriver
        />
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

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
    color: Colors.primaryTextBlur,
  },
  labelSelectedStyle: {
    color: Colors.primary,
  },
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
