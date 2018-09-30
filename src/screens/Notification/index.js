import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Item from '../../components/Items/NotificationItem';
import Divider from '../../components/Divider';
import Text from '../../components/Text';
import { push } from '../../navigation/navigationActions';
import { getDataArr } from '../../redux/crudCreator/selectors';
import NotificationActions from '../../redux/NotificationsRedux/actions';

class Notification extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    componentId: PropTypes.string,
    getNotifications: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getNotifications } = this.props;
    getNotifications();
  }

  onPressItem = data => () => {
    const { componentId } = this.props;
    push(componentId, 'notificationDetail', {
      title: I18n.t('notification.detailTitle'),
      passProps: { data },
    });
  };

  renderItem = ({ item, index }) => {
    return <Item data={item} key={index} onPress={this.onPressItem(item)} />;
  };

  renderEmpty = () => (
    <View style={[styles.center, styles.empty]}>
      <Text type="body2">{I18n.t('notification.empty')}</Text>
    </View>
  );

  render() {
    const { dataSource } = this.props;
    console.log('dataSource', dataSource);
    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource}
          renderItem={this.renderItem}
          keyExtractor={data => data.id.toString()}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={() => <Divider style={{ marginLeft: 60, marginRight: 20 }} />}
          ListFooterComponent={() => <View style={{ height: 20 }} />}
          ListHeaderComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginTop: 10,
  },
});

const mapStateToProps = state => {
  return {
    dataSource: getDataArr(state, 'notifications'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotifications: () => dispatch(NotificationActions.getAllNotifications()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notification);
