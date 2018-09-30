import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Container from '../../components/Container';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import Text from '../../components/Text';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import LoginActions from '../../redux/LoginRedux/actions';
import { startWithTabs, push, showInAppNoti } from '../../navigation/navigationActions';
import SessionTypes from '../../components/SessionTypes';

class SignupTutor extends Component {
  constructor(props) {
    super(props);
    const { tutor_info } = props.user;
    const types = {};
    if (tutor_info) {
     tutor_info.availability.session_types.forEach(element => {
      types[element] = true;
     });
    }
    this.state = {
      types: types,
      about: tutor_info ? tutor_info.about : {},
      availability: tutor_info ? tutor_info.availability : {},
      subjects: tutor_info ? [...tutor_info.subjects] : [],
    };
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'skip') {
      startWithTabs();
    }
  };

  submitData = () => {
    const { types, subjects } = this.state;
    const {
      hourly_rate, education, exp, interests, description,
    } = this;
    // const { isEdit, editUser, signUp } = this.props;
    if (
      education.getText()
      && exp.getText()
      && interests.getText()
      && description.getText()
      && hourly_rate.getText()
    ) {
      const data = {
        about: {
          education: education.getText(),
          exp: exp.getText(),
          interests: interests.getText(),
          description: description.getText(),
        },
        availability: {
          session_types: Object.keys(types).filter(key => types[key]),
          hourly_rate: hourly_rate.getText(),
          currency: 'USD',
        },
        subjects,
      };
      this.props.preBecomeTutor(data);
      this.goTutorSubjects();
    } else {
      showInAppNoti('', I18n.t('error.becomeTutor.info'), 'error');
    }
  };

  onSelectType = type => {
    const { types } = this.state;
    this.setState({ types: {...types, [type.id]: !types[type.id]} });
  };

  goTutorSubjects = () => {
    const { componentId, isFromMenu } = this.props;
    push(componentId, 'selectTutorSubjects', {
      title: I18n.t('userInfo.tutor.titleSubjects'),
      passProps: {
        isFromMenu,
      },
    });
  };

  renderInput = () => {
    const { types, about, availability } = this.state;
    return (
      <View style={styles.vInput}>
        <SessionTypes isSignupTutor session_types={types} onPress={this.onSelectType} />
        <Text type="headline" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.description')}
        </Text>
        <InputRow
          ref={ref => {
            this.description = ref;
          }}
          underLine
          multiline
          style={styles.textarea}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.tutor.descriptionPlaceholder')}
          defaultValue={about.description}
        />
        <Text type="headline" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.pricePerHour')}
        </Text>
        <InputRow
          ref={ref => {
            this.hourly_rate = ref;
          }}
          keyboardType="number-pad"
          underLine
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.tutor.pricePerHourPlaceholder')}
          defaultValue={availability.hourly_rate}
        />
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
          defaultValue={about.education}
        />
        <Text type="headline" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.experience')}
        </Text>
        <InputRow
          ref={ref => {
            this.exp = ref;
          }}
          underLine
          multiline
          style={styles.textarea}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.tutor.experiencePlaceholder')}
          defaultValue={about.exp}
        />
        <Text type="headline" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.hobbies')}
        </Text>
        <InputRow
          ref={ref => {
            this.interests = ref;
          }}
          underLine
          multiline
          style={styles.textarea}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.tutor.hobbiesPlaceholder')}
          defaultValue={about.interests}
        />
      </View>
    );
  };

  render() {
    const { isEdit } = this.props;
    return (
      <Container>
        <KeyboardAwareScrollView style={styles.container}>
          {isEdit && this.renderHeader()}
          {this.renderInput()}
        </KeyboardAwareScrollView>
        <Button
          style={styles.button}
          onPress={this.submitData}
          buttonTitle={I18n.t('button.next')}
        />
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  vInput: {
    marginTop: 35,
    paddingBottom: 100,
  },
  txtTitle: {
    paddingTop: 15,
  },
  button: {
    width: width - 40,
    backgroundColor: Colors.primary,
    marginTop: 20,
    position: 'absolute',
    bottom: 30,
    left: 20
  },
  textarea: {
    marginTop: 0,
    marginHorizontal: 0,
  },
  row: {
    marginTop: 15,
    flexDirection: 'row',
  },
  btnOnline: {
    width: 100,
    height: 40,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  btnOffline: {
    width: 100,
    height: 40,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.divider,
  },
});
SignupTutor.propTypes = {
  isEdit: PropTypes.bool,
  isFromMenu: PropTypes.bool,
  componentId: PropTypes.string,
};
function mapStateToProps(state) {
  return {
    user: state.login.data,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => dispatch(LoginActions.signUp(data)),
    editUser: data => dispatch(LoginActions.editUser(data)),
    preBecomeTutor: data => dispatch(LoginActions.preBecomeTutor(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupTutor);
