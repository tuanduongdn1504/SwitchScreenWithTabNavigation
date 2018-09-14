import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors, Fonts } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { push } from '../../navigation/navigationActions';
import { back } from '../../navigation/navigationButtons';

export default class ForgotPassword extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Forgot Password',
        },
        largeTitle: {
          visible: true,
          fontSize: 34,
          color: Colors.primaryText,
          fontFamily: Fonts.type.semiBold,
        },
        leftButtons: [back()],
        drawBehind: false,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.data = {
      username: 'longnguyen',
    };
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  signUp = () => {
    push(this.props.componentId, 'signUp', {
      title: I18n.t('signUp'),
    });
  };

  signIn = () => {
    this.props.signIn(this.data);
    // if (this.data.phone_number && this.data.password) {
    //   this.props.signIn(this.data);
    // }
  };

  renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Button
          primary
          style={styles.vBtn}
          onPress={this.signIn}
          buttonTitle={I18n.t('send').toLocaleUpperCase()}
        />
      </View>
    );
  };

  renderInput = () => (
    <View>
      <Text
        type="mediumBold"
        style={styles.vInputGroup}
        color={Colors.primaryText}
      >
        Enter email address you used when joined.
      </Text>
      <Text
        type="mediumBold"
        style={styles.vInputGroup}
        color={Colors.primaryTextBlur}
      >
        We will email you a link to reset your password.
      </Text>
      <View style={styles.vInput}>
        <InputRow
          textColor={Colors.primary}
          animatedTitle
          underLine
          onChangeText={this.onChange('email')}
          placeholderTextColor={Colors.lightGray}
          placeholder={I18n.t('userInfo.email')}
        />
      </View>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          {this.renderInput()}
          {this.renderButtonGroup()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    backgroundColor: 'transparent',
    // width,
  },
  vButtonGroup: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    // paddingHorizontal: 32,
  },
  vInputGroup: {
    alignItems: 'center',
    // marginTop: 40,
    backgroundColor: 'red',
  },

  vInput: {
    paddingHorizontal: 20,
  },
  vBtn: {
    width: width - 40,
    height: 50,
    borderRadius: 25,
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
