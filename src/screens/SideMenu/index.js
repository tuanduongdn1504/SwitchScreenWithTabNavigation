import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import UserInfo from './UserInfo';
import SettingItem from '../../components/Items/SettingItem';
import LoginActions from '../../redux/LoginRedux/actions';
import LocationRedux from '../../redux/LocationRedux/actions';
import Button from '../../components/Button';

class Setting extends Component {
  static navigatorStyle = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { requestLocation } = this.props;
    requestLocation();
  }

  editProfile = () => {};

  share = () => {};

  rate = () => {};

  goTerms = () => {};

  openFAQ = () => {};

  beComeTutor = () => {};

  showChatBox = () => {};

  renderBecomeTutorBtn = () => {
    const { user } = this.props;
    if (user.role === 'tutor') {
      return null;
    }
    return (
      <Button
        isShadow
        style={styles.btnBecomeATutor}
        primary
        onPress={this.beComeTutor}
        buttonTitle={I18n.t('moreText.becomeATutor').toLocaleUpperCase()}
      />
    );
  };

  render() {
    const { logout, user, requestLocation } = this.props;

    return (
      <View style={styles.container}>
        <UserInfo user={user} onPress={this.editProfile} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <SettingItem onPress={this.openFAQ('tutor')} title={I18n.t('moreText.tutorFAQ')} />
          <SettingItem onPress={this.openFAQ('student')} title={I18n.t('moreText.studentFAQ')} />
          <SettingItem
            onPress={() => {
              requestLocation(true);
            }}
            title={I18n.t('moreText.updateLocation')}
            subTitle={user.address || I18n.t('moreText.unknow')}
          />
          <SettingItem onPress={() => {}} title={I18n.t('moreText.privacy')} />
          <SettingItem onPress={() => {}} title={I18n.t('moreText.termOfService')} />
          <SettingItem onPress={() => {}} title={I18n.t('moreText.setting')} />
          <SettingItem
            unShowArrow
            color={Colors.primary}
            onPress={this.showChatBox}
            title={I18n.t('moreText.customerSupport')}
          />
          <SettingItem
            unShowArrow
            noBottomBorder
            color={Colors.primary}
            onPress={logout}
            title={I18n.t('moreText.logout')}
          />
          <View style={{ height: 100 }} />
        </ScrollView>
        {this.renderBecomeTutorBtn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.default,
    flex: 1,
  },
  btnBecomeATutor: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

Setting.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  requestLocation: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    user: state.login.data,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(LoginActions.signOut()),
    requestLocation: isUpdateInfo => dispatch(LocationRedux.requestLocation(isUpdateInfo)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
