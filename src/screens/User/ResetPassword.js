import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import { push } from '../../navigation/navigationActions';

export default class ForgotPassword extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };

  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('userInfo.password.resetPassword'),
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
    const { componentId } = this.props;
    push(componentId, 'signIn', {});
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

  renderInput = () => (
    <View style={styles.groupInput}>
      <InputRow
        ref={ref => {
          this.newPassword = ref;
        }}
        textColor={Colors.primary}
        animatedTitle
        underLine
        validateType="password"
        secureTextEntry
        // onChangeText={this.onChange('newPassword')}
        onSubmitEditing={() => this.focusNextField('confirmPassword')}
        returnKeyType="next"
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.password.newPassword')}
      />
      <InputRow
        ref={ref => {
          this.confirmPassword = ref;
        }}
        textColor={Colors.primary}
        animatedTitle
        underLine
        validateType="password"
        secureTextEntry
        // onChangeText={this.onChange('confirmPassword')}
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.password.confirmPassword')}
        style={styles.input}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
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
  groupInput: {
    // marginTop: 40,
  },
  input: {
    marginTop: 15,
  },
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
// )(ForgotPassword);
