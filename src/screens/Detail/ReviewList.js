import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import ReviewItem from '../../components/Items/ReviewItem';
// import Divider from '../../components/Divider';
import Text from '../../components/Text';
import { PRIMARY_KEY } from '../../redux/crudCreator/actions';

const DetailList = ({ data }) => {
  const renderItem = ({ item }) => <ReviewItem data={item} key={item[PRIMARY_KEY]} />;

  const renderEmpty = () => (
    <View style={[styles.center, styles.empty]}>
      <Text type="body3">No reviews</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={() => <View style={{ width: 20 }} />}
        ListFooterComponent={() => <View style={{ width: 20 }} />}
      />
    </View>
  );
};

DetailList.propTypes = {
  data: PropTypes.array,
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginTop: 20,
  },
});

export default DetailList;
