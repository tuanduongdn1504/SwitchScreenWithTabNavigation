import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Container from '../../components/Container';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import LoginActions from '../../redux/LoginRedux/actions';
import { startWithTabs } from '../../navigation/navigationActions';

class SignupStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.data = {};
  }

  submitData = () => {
    // const { types, levels } = this.data;
    // const { isEdit, editUser, signUp } = this.props;
    // const data = {
    //   types, levels
    // };
  };

  submitData = () => {
    startWithTabs();
  };

  renderInput = () => {
    return (
      <View style={styles.vInput}>
        <InputRow
          ref={ref => {
            this.grade = ref;
          }}
          returnKeyType="next"
          animatedTitle
          underLine
          onSubmitEditing={() => this.focusNextField('school')}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.student.grade')}
        />
        <InputRow
          ref={ref => {
            this.school = ref;
          }}
          animatedTitle
          underLine
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.student.school')}
        />
      </View>
    );
  };

  render() {
    return (
      <Container>
        <KeyboardAwareScrollView>
          {this.renderInput()}
          <Button
            onPress={this.submitData}
            style={styles.btnConfirm}
            buttonTitle={I18n.t('button.confirm').toLocaleUpperCase()}
          />
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  vInput: {
    marginTop: 35,
    paddingHorizontal: 20,
  },
  btnConfirm: {
    height: 40,
    width: width - 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    marginTop: 20,
    marginLeft: 20,
  },
});

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
)(SignupStudent);
