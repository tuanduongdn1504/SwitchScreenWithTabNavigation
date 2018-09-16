import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from 'react-native-i18n';
import {
  View, StyleSheet, Image, Dimensions,
} from 'react-native';
import Text from '../Text';
import Colors from '../../themes/Colors';
import Touchable from '../Touchable';

const { width } = Dimensions.get('window');
const MedicineItem = ({ data, onPress }) => {
  return (
    <View style={styles.root}>
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.vLeft}>
            <Text type="body2Bold" color={Colors.primaryText}>
              {data.name}
            </Text>
            <Text type="subTextLight" color={Colors.secondaryText} style={styles.subTitle}>
              {data.using}
            </Text>
          </View>
          <View style={styles.vRight}>
            <Text color={Colors.primaryText} style={styles.subTitle}>
              {`x ${data.quantity}`}
            </Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

MedicineItem.propTypes = {
  data: PropTypes.obj,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
  },
  container: {
    backgroundColor: Colors.default,
    paddingVertical: 15,
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

export default MedicineItem;
