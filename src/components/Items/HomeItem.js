import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import I18n from 'react-native-i18n';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../Text';
import Colors from '../../themes/Colors';
import Touchable from '../Touchable';
import { Images } from '../../themes';

const HomeItem = ({ data, onPress }) => {
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
              <View style={styles.vContent}>
                <InfoRow icon="ios-call" text={data.phoneNumber} />
                <InfoRow icon="ios-pin" text={data.address} />
              </View>
            </View>
            <Text type="subText" color={Colors.secondaryText} style={styles.subTitle}>
              {`${moment().diff(moment(data.dob), 'years')} ${I18n.t('olds')}`}
            </Text>
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
      <Text type="lightNote" color={Colors.primaryTextBlur} style={{ flex: 1 }}>
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
    backgroundColor: Colors.default,
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
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    fontSize: 17,
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
