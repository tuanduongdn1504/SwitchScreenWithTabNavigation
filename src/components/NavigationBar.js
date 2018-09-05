import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { Colors } from '../themes';
import Text from './Text';

const { width } = Dimensions.get('window');

const Notifications = ({ title }) => {
  // const { full_name, avatar, sex } = props.user;
  return (
    <View style={styles.content}>
      <View style={styles.vRight}>
        <Text type="title26PX" color={Colors.primary}>
          {title}
        </Text>
        {/* <Text type="lightNote" color={Colors.default}>
            {I18n.t('menu.editProfile')}
          </Text> */}
      </View>
    </View>
  );
};

const styles = {
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 38 : 13,
    paddingBottom: 13,
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: Colors.primary,
    backgroundColor: Colors.secondary,
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 28,
  },
  vRight: {
    flex: 1,
    paddingLeft: 10,
  },
};

export default Notifications;
