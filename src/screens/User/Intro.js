import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import Text from '../../components/Text';
import LoginActions from '../../redux/LoginRedux/actions';
import { push } from '../../navigation/navigationActions';
import CheckUpdate from '../Home/CheckUpdate';
import AppLogo from '../../components/AppLogo';
import InputRow from '../../components/InputRow';
import Container from '../../components/Container';
import KeyboardAwareScrollViewUI from '../../components/KeyboardAwareScrollView';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
    this.password = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  signUp = () => {
    push(this.props.componentId, 'signUp', {
      title: I18n.t('signUp'),
    });
  };

  login = () => {
    const { signIn } = this.props;
    if (this.email.getText() && this.password.getText()) {
      const data = {
        email: this.email.getText(),
        password: this.password.getText(),
      };
      signIn(data);
    }
  };

  focusNextField(nextField) {
    this[nextField].focus();
  }

  renderHeader = () => {
    return (
      <View style={styles.vHeader}>
        <AppLogo />
        <Text type="largeTitleBold" style={styles.txtAppName} center color={Colors.primaryText}>
          {I18n.t('appName')}
        </Text>
        <Text type="body2" center style={styles.txtDes} color={Colors.secondaryText}>
          {I18n.t('intro.appDes')}
        </Text>
      </View>
    );
  };

  renderInputView = () => {
    return (
      <View style={styles.vInput}>
        <InputRow
          ref={ref => {
            this.email = ref;
          }}
          returnKeyType="next"
          animatedTitle
          underLine
          keyboardType="email-address"
          validateType="email"
          icon="md-mail"
          onSubmitEditing={() => this.focusNextField('password')}
          validateMessage={I18n.t('error.email')}
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.email')}
        />
        <InputRow
          ref={ref => {
            this.password = ref;
          }}
          animatedTitle
          underLine
          icon="md-lock"
          secureTextEntry
          placeholderTextColor={Colors.placeholderText}
          placeholder={I18n.t('userInfo.password.title')}
        />
      </View>
    );
  };

  renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Button
          primary
          style={styles.btnLogin}
          onPress={this.login}
          buttonTitle={I18n.t('intro.login').toLocaleUpperCase()}
        />
        <Text type="body2" style={styles.txtSignup} color={Colors.primaryText}>
          {`${I18n.t('intro.dontHaveAccount')} `}
          <Text type="body2" onPress={this.signUp} color={Colors.primary}>
            {`${I18n.t('intro.signUp')}`}
          </Text>
        </Text>
        <View style={{ height: 40 }} />
      </View>
    );
  };

  render() {
    const { fbSignIn } = this.props;
    return (
      <Container>
        <KeyboardAwareScrollViewUI style={styles.container}>
          <CheckUpdate />
          {this.renderHeader()}
          <Button
            startColor={Colors.facebook}
            endColor={Colors.facebook}
            style={styles.btnLogin}
            onPress={fbSignIn}
            fontAwesome="facebook-f"
            iconColor={Colors.default}
            buttonTitle={I18n.t('conectFB').toLocaleUpperCase()}
          />
          <Text type="body2" center color={Colors.secondaryText}>
            {`${I18n.t('intro.orLoginWithEmail')} `}
          </Text>
          {this.renderInputView()}
          {this.renderButtonGroup()}
        </KeyboardAwareScrollViewUI>
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  vButtonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 32,
  },
  btnLogin: {
    width: width - 40,
    marginBottom: 20,
  },
  vHeader: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtDes: {
    marginTop: 10,
    marginBottom: 20,
  },
  txtAppName: {
    marginTop: 20,
  },
});

Intro.propTypes = {
  fbSignIn: PropTypes.func,
  signIn: PropTypes.func,
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: data => dispatch(LoginActions.signIn(data)),
    fbSignIn: data => dispatch(LoginActions.fbSignIn(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro);
