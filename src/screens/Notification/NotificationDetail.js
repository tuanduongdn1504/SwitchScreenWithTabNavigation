import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../../components/Text';
import { fromNow } from '../../utils/textUtils';

const NotificationDetail = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text type="title2">{data.title}</Text>
      <Text type="small" style={styles.timer}>
        {fromNow(data.created_at)}
      </Text>
      <Text type="body2" style={styles.content}>
        {data.content}
      </Text>
    </View>
  );
};

NotificationDetail.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  timer: {
    marginTop: 5,
  },
  content: {
    marginTop: 15,
  },
});

export default NotificationDetail;
