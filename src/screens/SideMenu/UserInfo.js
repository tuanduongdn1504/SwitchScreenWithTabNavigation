import React from 'react';
import I18n from 'react-native-i18n';
import {
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { Colors, Images } from '../../themes';
import Text from '../../components/Text';

const { width, height } = Dimensions.get('window');
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

const UserInfo = props => {
  const { full_name, avatar, sex } = props.user;
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => props.onPress()}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: avatar || global.defaultImage[sex] }}
          defaultSource={Images.defaultUser}
          style={styles.avatar}
        />
        <View style={styles.vRight}>
          <Text type="title26PX" color={Colors.primary}>
            {full_name}
          </Text>
          <Text type="lightNote" color={Colors.default}>
            {I18n.t('menu.editProfile')}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default UserInfo;
