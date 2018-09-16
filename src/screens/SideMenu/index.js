import React, { Component } from 'react';
import {
  ScrollView, StyleSheet, View, Dimensions,
} from 'react-native';
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

  render() {
    const { user, logout } = this.props;
    return (
      <View style={styles.container}>
        <UserInfo user={user} onPress={this.editProfile} />
        <ScrollView>
          <SettingItem onPress={this.goAbout} title={I18n.t('moreText.tutorFAQ')} />
          <SettingItem onPress={this.goAbout} title={I18n.t('moreText.studentFAQ')} />
          <SettingItem onPress={() => {}} title={I18n.t('moreText.updateCurrentLocation')} />
          <SettingItem
            unShowArrow
            noBottomBorder
            color={Colors.primary}
            onPress={logout}
            title={I18n.t('moreText.logout')}
          />
        </ScrollView>
        {/* <Button
          center={false}
          onPress={this.logout}
          transparent
          ionicons="md-log-out"
          iconSize={30}
          buttonTitle={I18n.t('moreText.logout')}
          style={styles.btnLogout}
          textStyle={styles.txtLogout}
        /> */}
        <Button
          style={styles.btnBecomeATutor}
          primary
          onPress={this.beComeTutor}
          buttonTitle={I18n.t('moreText.becomeATutor')}
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
    // user: state.login.data,
    user: {
      full_name: 'Anh Doan',
    },
  };
}

const mapDispatchToProps = dispatch => {
  return {
    logout: data => dispatch(LoginActions.signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Setting);
