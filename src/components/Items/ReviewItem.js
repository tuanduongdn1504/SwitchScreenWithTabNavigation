import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../themes';
import Text from '../Text';
import StarRating from '../StarRating';

const ReviewItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 30,
          alignItems: 'flex-start',
        }}
      >
        <StarRating disabled rating={4.5} starSize={16} />
      </View>

      <Text type="body2" style={styles.txtContent}>
        {data.content}
      </Text>
      <Text type="body3" style={styles.txtAuthor}>
        {'By '}
        {data.author}
        {' - '}
        {data.timer}
      </Text>
    </View>
  );
};

ReviewItem.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  txtContent: {
    color: Colors.primaryText,
    marginTop: 10,
  },
  txtAuthor: {
    marginTop: 15,
  },
});

export default ReviewItem;
