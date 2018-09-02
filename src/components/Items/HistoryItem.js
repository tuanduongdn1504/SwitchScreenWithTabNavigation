import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from 'react-native-i18n';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Text from '../Text';
import Colors from '../../themes/Colors';
import Touchable from '../Touchable';
import { STATUS } from '../../localData';

const HomeItem = ({ data, onPress }) => {
  return (
    <View style={styles.root}>
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.vLeft}>
            <Text type="normalBold" color={Colors.primary}>
              {`Mã khám ${data.code}`}
            </Text>
            <Text type="subText" color={Colors.primaryText} style={styles.subTitle}>
              {STATUS[data.status]}
            </Text>
          </View>
          <View style={styles.vRight}>
            <Text type="normalBold" color={Colors.secondaryText} style={styles.subTitle}>
              {moment(data.examine_date).format('DD-MM-YYYY')}
            </Text>
            <Text type="normal" color={Colors.secondaryText} style={styles.subTitle}>
              {moment(data.examine_date).format('hh:mm A')}
            </Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

HomeItem.propTypes = {
  data: PropTypes.obj,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: Colors.default,
    padding: 15,
    paddingLeft: 30,
    flexDirection: 'row',
  },
  vLeft: {
    flex: 1,
  },
  vRight: {
    alignItems: 'center',
  },
  subTitle: {
    paddingTop: 5,
  },
});

export default HomeItem;
