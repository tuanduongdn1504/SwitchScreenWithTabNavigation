import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../Text';
import Colors from '../../themes/Colors';
import Touchable from '../Touchable';
import StarRating from '../StarRating';
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
                uri: data.avatar,
              }}
              defaultSource={Images.defaultUser}
            />
            <View style={styles.vCenter}>
              <Text numberOfLines={1} type="body2" color={Colors.primaryText}>
                {`${data.first_name} ${data.last_name}`}
              </Text>
              <View style={[styles.ratingContainer, styles.row]}>
                <StarRating
                  disabled
                  rating={data.average_rating}
                  starSize={16}
                  containerStyle={styles.rating}
                />
                <Text type="small">
                  {'('}
                  {data.reviews?.length}
                  {')'}
                </Text>
              </View>
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
  ratingContainer: {
    marginTop: 10,
  },
  rating: {
    marginRight: 5,
  },
});

export default HomeItem;
