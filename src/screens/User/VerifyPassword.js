import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
// import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import CodeInput from '../../components/CodeInput';
import Button from '../../components/Button';
import { showModal } from '../../navigation/navigationActions';
import { closeAll } from '../../navigation/navigationButtons';
import Text from '../../components/Text';

export default class VerifyPassword extends Component {
  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('userInfo.password.verifyPassword'),
        },
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.newPassword = React.createRef();
    this.confirmPassword = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  confirm = () => {
    showModal('resetPassword', {
      leftButtons: [closeAll()],
    });
  };

  renderButtonGroup = () => {
    return (
      <Button
        primary
        style={styles.button}
        onPress={this.confirm}
        buttonTitle={I18n.t('confirm').toLocaleUpperCase()}
      />
    );
  };

  focusNextField(nextField) {
    this[nextField].focus();
  }

  renderDescription = () => {
    return (
      <View style={styles.description}>
        <Text type="body2" color={Colors.primaryText}>
          {I18n.t('userInfo.password.verifyPasswordCaption')}
        </Text>
        <Text type="body3" color={Colors.primaryTextBlur}>
          {I18n.t('userInfo.password.verifyPasswordDescription')}
        </Text>
      </View>
    );
  };

  renderInput = () => (
    <View style={styles.groupInput}>
      <CodeInput numberOfDigit={4} />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          {this.renderDescription()}
          {this.renderInput()}
          {this.renderButtonGroup()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    marginTop: 40,
  },
  groupInput: {},
  button: {
    width: width - 40,
    marginTop: 40,
  },
});

// function mapStateToProps(state) {
//   return {};
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     signIn: data => dispatch(LoginActions.signIn(data)),
//     fbSignIn: data => dispatch(LoginActions.fbSignIn(data)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(VerifyPassword);
