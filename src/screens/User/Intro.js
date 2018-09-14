import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, Image,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors, Images } from '../../themes';
import Button from '../../components/Button';
import Text from '../../components/Text';
import LoginActions from '../../redux/LoginRedux/actions';
import { push } from '../../navigation/navigationActions';
import CheckUpdate from '../Home/CheckUpdate';
import SwipperView from '../../components/SwipperView';

class Intro extends Component {
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
    push(this.props.componentId, 'signIn', {
      title: I18n.t('signIn'),
    });
  };

  renderIntro = data => {
    return (
      <View key={data} style={styles.vIntro}>
        <Image style={styles.introImg} source={Images[`intro${data}`]} />
        <Text type="RegularTitle26PX" color={Colors.primaryText} center>
          {I18n.t(`intro.introTitle${data}`)}
        </Text>
        <Text type="normal18PX" color={Colors.secondaryText} center style={styles.txtIntroDes}>
          {I18n.t(`intro.introDes${data}`)}
        </Text>
      </View>
    );
  };

  renderButtonGroup = () => {
    const { fbSignIn } = this.props;
    return (
      <View style={styles.vButtonGroup}>
        <Button
          startColor={Colors.facebook}
          endColor={Colors.facebook}
          style={styles.btnLogin}
          onPress={fbSignIn}
          fontAwesome="facebook-f"
          iconColor={Colors.default}
          buttonTitle={I18n.t('conectFB').toLocaleUpperCase()}
        />
        <Button
          primary
          style={styles.btnLogin}
          onPress={this.signUp}
          buttonTitle={I18n.t('intro.createAccount').toLocaleUpperCase()}
        />
        <Text type="subText" style={styles.txtSignup} color={Colors.primaryText}>
          {`${I18n.t('intro.haveAccount')} `}
          <Text type="subText" onPress={this.signIn} color={Colors.primary}>
            {I18n.t('signIn')}
          </Text>
        </Text>
      </View>
    );
  };

  render() {
    const INTROS = [1, 2, 3];
    return (
      <View style={styles.container}>
        <CheckUpdate />
        <View style={styles.container}>
          <SwipperView autoScroll>{INTROS.map(data => this.renderIntro(data))}</SwipperView>
        </View>
        {this.renderButtonGroup()}
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width,
  },
  vIntro: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  vButtonGroup: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 32,
  },
  btnLogin: {
    width: width - 40,
    marginBottom: 30,
  },
  txtSignup: {
    marginBottom: 30,
  },
  introImg: {
    width: width - 80,
  },
  txtIntroDes: {
    marginTop: 15,
  },
});

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
