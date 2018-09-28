import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Profile from './Profile';
import { Colors } from '../../themes';
import TutorsActions from '../../redux/TutorsRedux/actions';
import Text from '../../components/Text';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import StarRating from '../../components/StarRating';

class Review extends Component {
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

  onCustomStarRatingPress(rating) {
    this.setState({
      customStarCount: rating,
    });
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
          containerStyle={styles.rating}
        />
        <View style={styles.center}>
          <Text type="smallNormal">{I18n.t('review.tapStar')}</Text>
        </View>
        <View style={styles.vInput}>
          <Text type="headline" style={styles.txtTitle}>
            {I18n.t('review.title')}
          </Text>
          <InputRow
            ref={ref => {
              this.education = ref;
            }}
            underLine
            multiline
            style={styles.textarea}
            placeholderTextColor={Colors.placeholderText}
            placeholder={I18n.t('review.reviewPlaceHolder')}
          />
        </View>
        <Button
          primary
          style={styles.vBtn}
          onPress={this.send}
          buttonTitle={I18n.t('review.send').toLocaleUpperCase()}
        />
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rating: {
    marginVertical: 15,
    paddingHorizontal: 50,
  },
  txtTitle: {
    paddingTop: 15,
  },
  textarea: {
    marginTop: 0,
    marginHorizontal: 0,
  },
  vInput: {
    marginTop: 10,
  },
  vBtn: {
    width: width - 40,
    marginTop: 40,
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
)(Review);
