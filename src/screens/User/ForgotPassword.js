import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
// import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import { showModal } from '../../navigation/navigationActions';
import { close } from '../../navigation/navigationButtons';
import Text from '../../components/Text';

export default class ForgotPassword extends Component {
  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('userInfo.password.forgotPassword'),
        },
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  send = () => {
    showModal('verifyPassword', {
      leftButtons: [close()],
    });
  };

  renderDescription = () => {
    return (
      <View style={styles.description}>
        <Text type="body2" color={Colors.primaryText}>
          {I18n.t('userInfo.password.forgotPasswordCaption')}
        </Text>
        <Text type="body3" color={Colors.primaryTextBlur}>
          {I18n.t('userInfo.password.forgotPasswordDescription')}
        </Text>
      </View>
    );
  };

  renderInput = () => (
    <View style={styles.groupInput}>
      <InputRow
        ref={ref => {
          this.email = ref;
        }}
        textColor={Colors.primary}
        animatedTitle
        underLine
        validateType="email"
        // onChangeText={this.onChange('email')}
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.email')}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          {this.renderDescription()}
          {this.renderInput()}
          <Button
            primary
            style={styles.vBtn}
            onPress={this.send}
            buttonTitle={I18n.t('send').toLocaleUpperCase()}
          />
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
  description: {
    // marginTop: 40,
  },
  groupInput: {
    marginTop: 20,
  },
  vBtn: {
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
