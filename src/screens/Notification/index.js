import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import Item from '../../components/Items/NotificationItem';
import Divider from '../../components/Divider';
import Text from '../../components/Text';
import { push } from '../../navigation/navigationActions';
import { getDataArr } from '../../redux/crudCreator/selectors';
import NotificationActions from '../../redux/NotificationsRedux/actions';
import { PRIMARY_KEY } from '../../redux/crudCreator/actions';

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
      passProps: { data },
      largeTitle: false,
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
    // console.log('dataSource', dataSource);
    return (
      <FlatList
        data={dataSource}
        style={styles.container}
        renderItem={this.renderItem}
        keyExtractor={data => data[PRIMARY_KEY].toString()}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={this.renderEmpty}
        ItemSeparatorComponent={() => <Divider style={{ marginLeft: 80, marginRight: 20 }} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
