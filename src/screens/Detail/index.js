import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Profile from './Profile';
import { Colors } from '../../themes';
import TutorsActions from '../../redux/TutorsRedux/actions';
import Text from '../../components/Text';
import InputRow from '../../components/InputRow';
import StarRating from '../../components/StarRating';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customStarCount: 0,
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
    push(this.props.componentId, 'chatBox', {
      title: I18n.t('chatBox'),
      // leftButtons: [],
      // rightButtons: [close()],
      passProps: {
        receive: this.props.tutor,
      },
    });
  };

  onCustomStarRatingPress(rating) {
    this.setState({
      customStarCount: rating,
    });
  }

  render() {
    const { customStarCount } = this.state;
    // const { tutor } = this.props;
    return (
      <View style={styles.container}>
        <Profile fullName="Mei Nagano" avatar={global.defaultImage[1]} />
        <StarRating
          animation="tada"
          disabled={false}
          rating={customStarCount}
          selectedStar={rating => this.onCustomStarRatingPress(rating)}
          starSize={34}
          starPadding={5}
          containerStyle={styles.rating}
        />
        <Text type="smallNormal">{I18n.t('review.tapStar')}</Text>
        <View style={styles.vInput}>
          <View style={styles.vInput}>
            <Text type="headline" style={styles.txtTitle}>
              {I18n.t('userInfo.tutor.education')}
            </Text>
            <InputRow
              ref={ref => {
                this.education = ref;
              }}
              underLine
              multiline
              style={styles.textarea}
              placeholderTextColor={Colors.placeholderText}
              placeholder={I18n.t('userInfo.tutor.educationPlaceholder')}
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
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    marginVertical: 15,
  },
  txtTitle: {
    paddingTop: 15,
  },
  textarea: {
    marginTop: 0,
    marginHorizontal: 0,
  },
  vInput: {
    flex: 1,
    marginTop: 10,
    marginBottom: 40,
  },
  // row: {
  //   marginTop: 15,
  //   flexDirection: 'row',
  // },
  // divider: {
  //   width: 1,
  //   backgroundColor: Colors.divider,
  // },
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
