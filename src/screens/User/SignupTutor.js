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
import { startWithTabs, push } from '../../navigation/navigationActions';

class SignupTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'skip') {
      startWithTabs();
    }
  };

  submitData = () => {
    // const { types, levels } = this.data;
    // const { isEdit, editUser, signUp } = this.props;
    // const data = {
    //   types, levels
    // };
    this.goTutorSubjects();
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

  onChangeItem = (currentPopupProps, item) => {
    const { subjects } = this.state;
    const data = currentPopupProps === 'subjects' ? _.xor(subjects, [item]) : item;
    this.setState({ [currentPopupProps]: data });
  };

  renderInput = () => {
    return (
      <View style={styles.vInput}>
        <Text type="headline" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.pricePerHour')}
        </Text>
        <InputRow
          ref={ref => {
            this.pricePerHour = ref;
          }}
          underLine
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.tutor.pricePerHourPlaceholder')}
        />
        <Text type="headline" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.education')}
        </Text>
        <InputRow
          ref={ref => {
            this.grade = ref;
          }}
          underLine
          multiline
          style={styles.textarea}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.tutor.educationPlaceholder')}
        />
        <Text type="headline" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.experience')}
        </Text>
        <InputRow
          ref={ref => {
            this.school = ref;
          }}
          underLine
          multiline
          style={styles.textarea}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.tutor.experiencePlaceholder')}
        />
        <Text type="headline" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.hobbies')}
        </Text>
        <InputRow
          ref={ref => {
            this.hobbies = ref;
          }}
          underLine
          multiline
          style={styles.textarea}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.tutor.hobbiesPlaceholder')}
        />
      </View>
    );
  };

  render() {
    const { isEdit } = this.props;
    return (
      <Container style={styles.container}>
        <KeyboardAwareScrollView>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  vInput: {
    marginTop: 35,
  },
  txtTitle: {
    paddingTop: 15,
  },
  button: {
    height: 40,
    width: width - 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    marginTop: 20,
    position: 'absolute',
    bottom: 30,
  },
  textarea: {
    marginTop: 0,
    marginHorizontal: 0,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupTutor);
