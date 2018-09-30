/* eslint camelcase: 0 */
import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { Colors } from '../../themes';
import TutorsActions from '../../redux/TutorsRedux/actions';
import Text from '../../components/Text';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import StarRating from '../../components/StarRating';
import { getCurrentData } from '../../redux/crudCreator/selectors';
import { PRIMARY_KEY } from '../../redux/crudCreator/actions';

class Review extends Component {
  static propTypes = {
    data: PropTypes.object,
    createReviews: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
    };
    Navigation.events().bindComponent(this);
  }

  onRating(rating) {
    this.setState({ rating });
  }

  send = () => {
    const { rating } = this.state;
    const { data, createReviews } = this.props;
    createReviews({ [PRIMARY_KEY]: data[PRIMARY_KEY], rating, review: this.review.getText() });
  };

  render() {
    const { data } = this.props;
    const { first_name, last_name, avatar } = data;
    const { rating } = this.state;
    return (
      <View style={styles.container}>
        <Profile fullName={`${first_name} ${last_name}`} avatar={avatar} />
        <StarRating
          animation="tada"
          disabled={false}
          rating={rating}
          selectedStar={value => this.onRating(value)}
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
              this.review = ref;
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
    // data: getCurrentData(state, 'tutors'),
  };
}

const mapDispatchToProps = dispatch => {
  return {
    createReviews: data => dispatch(TutorsActions.createReviews(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Review);
