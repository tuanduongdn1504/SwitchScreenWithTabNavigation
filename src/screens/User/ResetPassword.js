import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import { push } from '../../navigation/navigationActions';
import { back } from '../../navigation/navigationButtons';
import Text, { styles as TextStyle } from '../../components/Text';

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
        largeTitle: {
          visible: true,
          ...TextStyle.largeTitle,
        },
        leftButtons: [back()],
        drawBehind: true,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
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

  renderInput = () => (
    <View style={styles.groupInput}>
      <InputRow
        textColor={Colors.primary}
        animatedTitle
        underLine
        onChangeText={this.onChange('newPassword')}
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.password.newPassword')}
      />
      <InputRow
        textColor={Colors.primary}
        animatedTitle
        underLine
        onChangeText={this.onChange('confirmPassword')}
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
  },
  groupInput: {
    marginTop: 40,
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
