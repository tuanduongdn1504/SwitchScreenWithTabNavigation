import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { View, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import { type, size } from '../themes/Fonts';
import { Colors } from '../themes/index';
import Text from './Text';

const DATE_FORMAT = 'DD-MM-YYYY';

const DatePickerUI = ({ date, onDateChange }) => {
  const momentDate = moment(date);
  return (
    <View style={styles.txtDateContainer}>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text
            type="normal"
            color={date ? Colors.primaryText : Colors.divider}
            style={{ flex: 1 }}
          >
            {date ? momentDate.format('YYYY').toUpperCase() : 'YYYY'}
          </Text>
          <Icon name="ios-arrow-down" size={20} color={Colors.divider} />
        </View>
        <View style={{ width: 10, backgroundColor: 'transparent' }} />
        <View style={styles.row}>
          <Text
            type="normal"
            color={date ? Colors.primaryText : Colors.divider}
            style={{ flex: 1 }}
          >
            {date ? momentDate.format('MM').toUpperCase() : 'MM'}
          </Text>
          <Icon name="ios-arrow-down" size={20} color={Colors.divider} />
        </View>
        <View style={{ width: 10 }} />
        <View style={styles.row}>
          <Text
            type="normal"
            color={date ? Colors.primaryText : Colors.divider}
            style={{ flex: 1 }}
          >
            {date ? momentDate.format('DD').toUpperCase() : 'DD'}
          </Text>
          <Icon name="ios-arrow-down" size={20} color={Colors.divider} />
        </View>
      </View>
      <DatePicker
        style={styles.datePicker}
        date={moment(date).format(DATE_FORMAT)}
        mode="date"
        is24Hour
        placeholder="select date"
        format={DATE_FORMAT}
        showIcon={false}
        hideText
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          disabled: styles.datetimeDisabled,
          dateInput: styles.dateInput,
          dateTouchBody: styles.dateTouchBody,
          dateText: styles.txtRowValue,
        }}
        onDateChange={(strDate) => {
          const convertDate = moment(
            ` ${strDate} ${moment(date).format('HH:mm')}`,
            'DD.MM.YYYY HH:mm',
          ).format();
          onDateChange(convertDate);
        }}
      />
    </View>
  );
};

DatePickerUI.propTypes = {};

DatePickerUI.defaultProps = {};

const { width, height } = Dimensions.get('window');

const datePickerWidth = width - 60;
const datePickerHeight = 70;

const styles = StyleSheet.create({
  datetimeDisabled: {
    backgroundColor: Colors.transparent,
    opacity: 0.5,
  },
  txtDateContainer: {
    height: 40,
    borderRadius: 5,
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
  },
  row: {
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateInput: {
    borderWidth: 0,
    borderColor: Colors.transparent,
    backgroundColor: Colors.transparent,
    alignItems: 'flex-start',
  },
  datePicker: {
    backgroundColor: Colors.transparent,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: datePickerWidth,
    height: datePickerHeight,
  },
  dateTouchBody: {
    width: datePickerWidth,
    height: datePickerHeight,
    marginLeft: 10,
  },
  txtMonth: {
    color: Colors.tabInActiveColor,
    fontFamily: type.regular,
    fontSize: 12,
    textAlign: 'center',
  },
  txtDate: {
    color: '#56b1b9',
    fontFamily: type.bold,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DatePickerUI;
