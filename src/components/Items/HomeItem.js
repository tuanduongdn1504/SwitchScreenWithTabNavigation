import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../Text';
import Colors from '../../themes/Colors';
import Touchable from '../Touchable';
import RatingStar from '../RatingStar';
import { Images } from '../../themes';
import { formatMoney } from '../../utils/textUtils';

const HomeItem = ({ data, onPress }) => {
  return (
    <View style={styles.root}>
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.vContent}>
            <Image
              style={styles.image}
              source={{
                uri: data.avatar || global.defaultImage[data.gender === 'Male' ? 0 : 1],
              }}
              defaultSource={Images.defaultUser}
            />
            <View style={styles.vCenter}>
              <Text numberOfLines={1} type="body2" color={Colors.primaryText}>
                {`${data.first_name} ${data.last_name}`}
              </Text>
              <RatingStar
                size={17}
                showTotalAfterStar
                left
                currentRating={3}
                maxRating={5}
                totalRated={120}
              />
              <Text
                numberOfLines={2}
                type="body3"
                color={Colors.secondaryText}
                style={styles.description}
              >
                {data.tutor_info?.about?.description}
              </Text>
              {/* <InfoRow icon="ios-call" text={data.phoneNumber} />
                <InfoRow icon="ios-pin" text={data.address} /> */}
            </View>
            <View style={styles.vPrice}>
              <Image style={styles.imagePriceTag} source={Images.priceTag} />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text center type="body3" color={Colors.default}>
                  $
                  {formatMoney(data.tutor_info?.availability?.hourly_rate)}
                  <Text center type="tiny" color={Colors.default}>
                    {'\n'}
                    per hour
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Touchable>
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
    paddingVertical: 10,
  },
  vContent: {
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  vCenter: {
    flex: 1,
    backgroundColor: Colors.default,
    marginLeft: 15,
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
  description: {},
  vPrice: {
    width: 110,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  imagePriceTag: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default HomeItem;
