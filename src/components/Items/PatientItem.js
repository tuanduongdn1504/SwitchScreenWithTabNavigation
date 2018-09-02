import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Text from '../Text';
import Colors from '../../themes/Colors';
import Touchable from '../Touchable';

const PatientItem = ({ data, onPress, isSelected }) => {
  return (
    <View style={styles.root}>
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.vHeader}>
            <Image
              style={styles.image}
              source={{ uri: data.avatar || global.defaultImage[data.sex] }}
            />
            <View style={styles.vText}>
              <Text type="normalBold" color={Colors.primary}>
                {data.full_name}
              </Text>
              <Text type="subText" color={Colors.secondaryText} style={styles.subTitle}>
                {`${moment().diff(moment(data.dob), 'years')} ${I18n.t('olds')}, ${moment(data.dob).format('DD/MM/YYYY')}`}
              </Text>
            </View>
            {isSelected && <Icon color={Colors.primary} size={30} name="md-checkmark" />}
          </View>
        </View>
      </Touchable>
    </View>
  );
};

PatientItem.propTypes = {
  data: PropTypes.obj,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
  },
  container: {
    marginHorizontal: 20,
    backgroundColor: Colors.default,
    padding: 15,
  },
  vHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  vText: {
    flex: 1,
    backgroundColor: Colors.default,
    marginLeft: 15,
  },
  subTitle: {
    paddingTop: 5,
  },
});

export default PatientItem;
