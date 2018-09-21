import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import UserInfo from './UserInfo';
import SettingItem from '../../components/Items/SettingItem';
import LoginActions from '../../redux/LoginRedux/actions';
import { push } from '../../navigation/navigationActions';
import { back } from '../../navigation/navigationButtons';
import Button from '../../components/Button';

class Setting extends Component {
  static navigatorStyle = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  editProfile = () => {
    const { componentId } = this.props;
    push(componentId, 'signUp', {
      title: I18n.t('profile'),
      passProps: {
        isEdit: true,
      },
    });
  };

  share = () => {};

  rate = () => {};

  goTerms = () => {};

  openFAQ = type => () => {
    const { componentId } = this.props;
    push(componentId, 'FAQ', {
      title: I18n.t(`faq.${type}`),
      leftButtons: [back()],
      passProps: {
        type,
      },
    });
  };

  beComeTutor = () => {
    const { componentId } = this.props;
    push(componentId, 'tutorInfo', {
      title: I18n.t('userInfo.tutor.titleAbout'),
      leftButtons: [back()],
      passProps: {
        isFromMenu: true,
      },
    });
  };

  showChatBox = () => {
    const { componentId } = this.props;
    push(componentId, 'chatBox', {
      title: I18n.t('chatBox'),
      passProps: {
        receive: 'supporter',
      },
    });
  };

  render() {
    const { logout, user } = this.props;

    return (
      <View style={styles.container}>
        <UserInfo user={user} onPress={this.editProfile} />
        <ScrollView>
          <SettingItem onPress={this.openFAQ('tutor')} title={I18n.t('moreText.tutorFAQ')} />
          <SettingItem onPress={this.openFAQ('student')} title={I18n.t('moreText.studentFAQ')} />
          <SettingItem
            onPress={() => {}}
            title={I18n.t('moreText.updateLocation')}
            subTitle="Osaka, Japan"
          />
          <SettingItem onPress={() => {}} title={I18n.t('moreText.privacy')} />
          <SettingItem onPress={() => {}} title={I18n.t('moreText.termOfService')} />
          <SettingItem
            unShowArrow
            noBottomBorder
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
        </ScrollView>
        <Button
          style={styles.btnBecomeATutor}
          primary
          onPress={this.beComeTutor}
          buttonTitle={I18n.t('moreText.becomeATutor').toLocaleUpperCase()}
        />
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
  componentId: PropTypes.string,
  user: PropTypes.object,
  logout: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    user: state.login.data,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(LoginActions.signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
