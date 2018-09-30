import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Images } from '../../themes';
import Text from '../../components/Text';

const Profile = ({ fullName, avatar }) => {
  return (
    <View style={styles.content}>
      <Image source={{ uri: avatar }} defaultSource={Images.defaultUser} style={styles.avatar} />
      <Text type="title2" style={styles.title}>
        {fullName}
      </Text>
    </View>
  );
};

Profile.propTypes = {
  fullName: PropTypes.string,
  avatar: PropTypes.string,
};

const styles = {
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  title: {
    marginTop: 10,
  },
};

export default Profile;
