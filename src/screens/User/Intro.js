import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import Text from '../../components/Text';
import LoginActions from '../../redux/LoginRedux/actions';
import BackgroundImage from '../../components/BackgroundImage';
import AppLogo from '../../components/AppLogo';
import { push, startWithTabs } from '../../navigation/navigationActions';
import CheckUpdate from '../Home/CheckUpdate';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.data = {};
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
    startWithTabs();
    // if (this.data.phone_number && this.data.password) {
    //   this.props.signIn(this.data);
    // }
  };

  renderButtonGroup = () => {
    return (
      <View style={styles.vButtonGroup}>
        <Button
          primary
          style={styles.btnLogin}
          onPress={this.signIn}
          buttonTitle={I18n.t('signIn').toLocaleUpperCase()}
        />
        <Text type="mediumBold" style={styles.txtSignup} color={Colors.default}>
          {`${I18n.t('dontHavePassword')} `}
          <Text type="mediumBold" underLine onPress={this.signUp} color={Colors.default}>
            {I18n.t('signUp')}
          </Text>
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <CheckUpdate />
        <BackgroundImage />
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <View style={styles.vTop}>
            <AppLogo style={styles.appLogo} />
            <Text type="headerBold" color={Colors.primary}>
              {I18n.t('appName')}
            </Text>
          </View>
          <View style={styles.vInput}>
            <InputRow
              textColor={Colors.primary}
              animatedTitle
              underLine
              onChangeText={this.onChange('phone_number')}
              placeholderTextColor={Colors.lightGray}
              placeholder={I18n.t('userInfo.phone')}
            />
            <InputRow
              textColor={Colors.primary}
              animatedTitle
              underLine
              secureTextEntry
              onChangeText={this.onChange('password')}
              placeholderTextColor={Colors.lightGray}
              placeholder={I18n.t('userInfo.password')}
            />
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width,
  },
  vTop: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    marginBottom: 10,
  },
  vButtonGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 32,
  },
  vInput: {
    paddingHorizontal: 32,
  },
  btnLogin: {
    width: width - 40,
  },
  txtSignup: {
    marginTop: 20,
  },
});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: data => dispatch(LoginActions.signIn(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro);
