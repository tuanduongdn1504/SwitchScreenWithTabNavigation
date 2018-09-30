import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../themes';
import Text from '../Text';

const ProfileItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text type="body2Bold" style={styles.txtTitle}>
        {data.title}
      </Text>
      <Text type="body3" style={styles.txtContent}>
        {data.content}
      </Text>
    </View>
  );
};

ProfileItem.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  txtTitle: {
    color: Colors.primaryText,
    marginTop: 10,
  },
  txtContent: {
    marginTop: 10,
  },
});

export default ProfileItem;
