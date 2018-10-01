import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import I18n from 'react-native-i18n';
import ProfileItem from '../../components/Items/ProfileItem';
import Text from '../../components/Text';

const DetailList = ({ data }) => {
  const dataSource = data
    ? Object.keys(data).map((key, index) => ({
      id: index,
      title: I18n.t(`detail.${key}`),
      content: data[key],
    }))
    : [];

  const renderItem = ({ item }) => <ProfileItem data={item} index={item.key} onPress={() => {}} />;

  const renderEmpty = () => (
    <View style={[styles.center, styles.empty]}>
      <Text type="body2">{I18n.t('detail.empty')}</Text>
    </View>
  );

  return (
    <View style={[styles.container]}>
      <FlatList
        data={dataSource}
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

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginTop: 20,
  },
});

DetailList.propTypes = {
  data: PropTypes.object,
};

export default DetailList;
