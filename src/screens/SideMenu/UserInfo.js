/* eslint-disable camelcase */
import React from 'react';
import I18n from 'react-native-i18n';
import {
  View, Image, Dimensions, TouchableHighlight, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Images } from '../../themes';
import Text from '../../components/Text';

const UserInfo = ({ user, onPress }) => {
  const {
    first_name, last_name, avatar, role,
  } = user;
  return (
    <TouchableHighlight underlayColor="transparent" onPress={() => onPress()}>
      <View style={styles.content}>
        <Image source={{ uri: avatar }} defaultSource={Images.defaultUser} style={styles.avatar} />
        <View style={styles.vRight}>
          <Text type="title2" color={Colors.primaryText}>
            {`${first_name} ${last_name}`}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {role === 'tutor' ? (
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="ios-checkmark-circle-outline"
                  size={16}
                  color={Colors.primary}
                  style={{ marginRight: 5 }}
                />
                <Text type="body3" color={Colors.primary}>
                  {I18n.t('menu.verified')}
                </Text>
              </View>
            ) : (
              <Text type="body3" color={Colors.primary}>
                {I18n.t('menu.student')}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object,
};

const { width } = Dimensions.get('window');
const styles = {
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 38 : 13,
    paddingBottom: 25,
    flexDirection: 'row',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  vRight: {
    flex: 1,
    paddingLeft: 10,
  },
};

export default UserInfo;
