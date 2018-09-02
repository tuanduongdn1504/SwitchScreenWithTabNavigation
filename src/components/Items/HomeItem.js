import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../Text';
import Colors from '../../themes/Colors';
import Touchable from '../Touchable';
import Button from '../Button';
import { Images } from '../../themes';

const HomeItem = ({ data, onPress, showQR }) => {
  return (
    <View style={styles.root}>
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.vHeader}>
            <Image
              style={styles.image}
              source={{
                uri: data.thumbnail || global.defaultImage[data.gender === 'Male' ? 0 : 1],
              }}
              defaultSource={Images.defaultUser}
            />
            <View style={styles.footer}>
              <Text type="normalBold" color={Colors.primaryText}>
                {data.name}
              </Text>
              <Text type="subText" color={Colors.secondaryText} style={styles.subTitle}>
                {`${moment().diff(moment(data.dob), 'years')} ${I18n.t('olds')}`}
              </Text>
            </View>
            <Button
              fontAwesome="qrcode"
              iconColor={Colors.default}
              iconSize={18}
              style={styles.btnQR}
              iconStyle={{ marginRight: 0 }}
              onPress={() => showQR(data)}
            />
          </View>
          <View style={styles.vContent}>
            <InfoRow icon="ios-call" text={data.phoneNumber} />
            <InfoRow icon="ios-pin" text={data.address} />
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

HomeItem.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
  },
  container: {
    marginBottom: 20,
    borderRadius: 14,
    backgroundColor: Colors.default,
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowRadius: 16,
    shadowOpacity: 1,
    elevation: 16,
    padding: 15,
  },
  vHeader: {
    flexDirection: 'row',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  footer: {
    flex: 1,
    backgroundColor: Colors.default,
    marginLeft: 15,
  },
  subTitle: {
    paddingTop: 5,
  },
  vContent: {
    paddingTop: 5,
  },
  row: {
    flexDirection: 'row',
    paddingTop: 3,
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    fontSize: 25,
  },
  description: {
    paddingLeft: 30,
    marginTop: 5,
  },
  btnQR: {
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 3,
  },
  vCode: {
    flex: 1,
  },
  vStatus: {
    width: 100,
    borderRadius: 15,
    height: 30,
  },
});

export default HomeItem;
