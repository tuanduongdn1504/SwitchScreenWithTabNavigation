import React from 'react';
import I18n from 'react-native-i18n';
import {
  View, Image, Dimensions, TouchableHighlight, Platform,
} from 'react-native';
import { Colors, Images } from '../../themes';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { pop } from '../../navigation/navigationActions';

const Profile = props => {
  // const { full_name, avatar, sex } = props.user;
  return (
    <View style={styles.content}>
      <Image
        // source={{ uri: global.defaultImage[1] }}
        defaultSource={Images.defaultUser}
        style={styles.avatar}
      />
      <Text type="title2" style={styles.title}>
        Mei Nagano
      </Text>
      {/* <View style={styles.row}>
          <Button
            onPress={() => {
              pop(props.componentId);
            }}
            iconColor={Colors.default}
            transparent
            ionicons="md-arrow-back"
            style={styles.btnBack}
          />
        </View> */}
      {/* <Image
          // source={{ uri: avatar || global.defaultImage[sex] }}
          source={{ uri: global.defaultImage[1] }}
          defaultSource={Images.defaultUser}
          style={styles.avatar}
        />
        <View style={styles.vRight}>
          <Text type="title1" color={Colors.primary}>
            Jennifer Aniston
          </Text>
          <Text type="small" color={Colors.default}>
            {I18n.t('menu.editProfile')}
          </Text>
        </View>
      </View> */}
    </View>
  );
};

// const { width, height } = Dimensions.get('window');
const styles = {
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    // width,
    // paddingHorizontal: 20,
    // paddingTop: Platform.OS === 'ios' ? 38 : 13,
    // paddingBottom: 13,
    // flexDirection: 'row',
    // borderBottomWidth: 5,
    // borderBottomColor: Colors.primary,
    // backgroundColor: Colors.secondary,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  vRight: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    marginTop: 10,
  },
};

export default Profile;
