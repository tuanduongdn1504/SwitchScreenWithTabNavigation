import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../../components/Text';
import Colors from '../../themes/Colors';
import Touchable from '../../components/Touchable';

const PatientInfo = ({ data, onPress }) => {
  return (
    <View style={styles.root}>
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.vHeader}>
            <View style={styles.footer}>
              <Text type="detailHeader" color={Colors.primary}>
                {data.name}
              </Text>
              <Text type="note" color={Colors.secondaryText} style={styles.subTitle}>
                {`${moment().diff(moment(data.dob), 'years')} ${I18n.t('olds')}, ${moment(
                  data.dob,
                ).format('DD/MM/YYYY')}`}
              </Text>
              <Text type="note" color={Colors.primaryTextBlur} style={styles.subText}>
                {`${I18n.t('userInfo.homeTown')} ${data.home_town}`}
              </Text>
            </View>
            <Image
              style={styles.image}
              source={{ uri: data.avatar || global.defaultImage[data.gender === 'Male' ? 0 : 1] }}
            />
          </View>
          <View style={styles.vContent}>
            <Text type="detailHeader" style={styles.txtHeader}>
              {I18n.t('userInfo.contact')}
            </Text>
            <InfoRow icon="ios-call" text={data.phoneNumber} />
            <InfoRow icon="ios-pin" text={data.address} />
            <Text type="subTextLight">{I18n.t('appDescription')}</Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

const InfoRow = ({ icon, text }) => {
  return (
    <View style={styles.row}>
      <Icon name={icon} color={Colors.primaryTextBlur} style={styles.icon} />
      <Text type="subText" color={Colors.primaryTextBlur} style={{ flex: 1 }}>
        {text}
      </Text>
    </View>
  );
};

PatientInfo.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
  },
  container: {
    marginHorizontal: 20,
    backgroundColor: Colors.default,
    padding: 15,
    paddingBottom: 0,
  },
  vHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  footer: {
    flex: 1,
    backgroundColor: Colors.default,
  },
  subTitle: {
    paddingTop: 5,
  },
  vContent: {},
  row: {
    flexDirection: 'row',
    paddingTop: 3,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
  subText: {
    marginTop: 3,
  },
  txtHeader: {
    marginTop: 10,
    marginBottom: 5,
  },
});

export default PatientInfo;
