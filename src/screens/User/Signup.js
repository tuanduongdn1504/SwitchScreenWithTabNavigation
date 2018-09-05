import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import moment from 'moment';
import { Colors } from '../../themes';
import Container from '../../components/Container';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import Input from '../../components/Input';
import Text from '../../components/Text';
import DatePickerUI from '../../components/DatePicker';
import ButtonRightIcon from '../../components/ButtonRightIcon';
import Checkbox from '../../components/Checkbox';
import ActionSheet from '../../components/ActionSheet';
import { CITY, SEX } from '../../localData';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import Avatar from '../../components/Avatar';
import SearchInput from '../../components/SearchInput';
import LoginActions from '../../redux/LoginRedux/actions';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.data = {
      sex: 0,
      isConfirmPrivacy: props.isEdit || props.isAddPatient || props.isEditPatient,
    };

    if (props.isEdit) {
      this.data = { ...this.data, ...props.user };
    }
    if (props.isEditPatient) {
      this.data = { ...this.data, ...props.patient };
    }
    this.state = {
      townSearchText: '',
      ...this.data,
    };
  }

  onChangeValue = (name, isSaveToState = false) => (value) => {
    const { isEdit, isAddPatient, isEditPatient } = this.props;
    this.data = {
      ...this.data,
      [name]: value,
    };
    if (isSaveToState) {
      this.setState({ [name]: value });
    }
    if (
      this.data.full_name
      && this.data.phone_number
      && this.data.dob
      && this.data.isConfirmPrivacy
      && this.data.address
      && (this.data.password || isEdit || isAddPatient || isEditPatient)
      && this.data.home_town
    ) {
      // this.props.navigator.setButtons({
      //   rightButtons: [isEdit || isEditPatient ? save(false) : send(false)],
      // });
    } else {
      // this.props.navigator.setButtons({
      //   rightButtons: [isEdit || isEditPatient ? save() : send()],
      // });
    }
  };

  onChangeSearch = (text) => {
    this.setState({ townSearchText: text });
  };

  onChangeHomeTown = (value) => {
    this.onChangeValue('home_town', true)(value);
    this.ActionSheet.hide();
  };

  onChangeSex = (value) => {
    this.onChangeValue('sex', true)(value);
    this.ActionSheet.hide();
  };

  onTogglePrivacy = () => {
    const { isConfirmPrivacy } = this.state;
    this.onChangeValue('isConfirmPrivacy', true)(!isConfirmPrivacy);
  };

  submitData = () => {
    const {
      password,
      full_name,
      email,
      phone_number,
      address,
      dob,
      home_town,
      avatar,
      sex,
    } = this.data;
    const { isEdit, editUser, signUp } = this.props;
    const data = {
      full_name,
      phone_number,
      address,
      dob: moment(dob).toISOString(),
      email,
      home_town,
      avatar,
      sex,
    };
    if (!isEdit) {
      data.password = password;
    }

    if (isEdit) {
      delete data.phone_number;
      editUser(data);
    } else {
      signUp(data);
    }
  };

  showPopup = name => () => {
    this.setState({ currentPopupProps: name }, () => {
      this.ActionSheet.show();
    });
  };

  _focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  renderInput = () => {
    const {
      isConfirmPrivacy,
      dob,
      email,
      password,
      home_town,
      address,
      sex,
      phone_number,
      full_name,
    } = this.state;
    const { isEdit } = this.props;
    const DATA = [
      {
        title: I18n.t('userInfo.name'),
        placeholder: I18n.t('userInfo.namePlaceholder'),
        key: 'full_name',
        value: full_name,
      },
      {
        title: I18n.t('userInfo.phone'),
        placeholder: I18n.t('userInfo.phonePlaceholder'),
        key: 'phone_number',
        value: phone_number,
      },
      {
        title: I18n.t('userInfo.address'),
        placeholder: I18n.t('userInfo.addressPlaceholder'),
        key: 'address',
        value: address,
      },
      {
        title: I18n.t('userInfo.email'),
        placeholder: I18n.t('userInfo.emailPlaceholder'),
        key: 'email',
        value: email,
      },
      {
        title: I18n.t('userInfo.password'),
        placeholder: I18n.t('userInfo.passwordPlaceholder'),
        key: 'password',
        value: password,
        secureTextEntry: true,
      },
    ];

    return (
      <View style={styles.vInput}>
        {DATA.map(data => (
          <Input
            {...data}
            defaultValue={this.state[data.key]}
            onChangeText={this.onChangeValue(data.key)}
          />
        ))}
        <Text type="subTextBlack" style={styles.txtTitle}>
          {I18n.t('userInfo.birthday')}
        </Text>
        <DatePickerUI onDateChange={this.onChangeValue('dob', true)} date={dob} />
        <Text type="subTextBlack" style={styles.txtTitle}>
          {I18n.t('userInfo.sex')}
        </Text>
        <ButtonRightIcon
          onPress={this.showPopup('sex')}
          textColor={SEX[sex] ? Colors.primaryText : Colors.divider}
          title={SEX[sex].title || I18n.t('userInfo.sexPlaceholder')}
        />
        <Text type="subTextBlack" style={styles.txtTitle}>
          {I18n.t('userInfo.homeTown')}
        </Text>
        <ButtonRightIcon
          onPress={this.showPopup('home_town')}
          textColor={home_town ? Colors.primaryText : Colors.divider}
          title={home_town || I18n.t('userInfo.homeTownPlaceholder')}
        />
        {!isEdit && (
          <Checkbox
            onPress={this.onTogglePrivacy}
            isChecked={isConfirmPrivacy}
            title={I18n.t('userInfo.signupPrivacy')}
          />
        )}
      </View>
    );
  };

  renderHeader = () => {
    const { avatar } = this.state;
    return (
      <Avatar
        image={avatar || null}
        setImage={data => this.onChangeValue('avatar', true)(data.uri)}
        circle
      />
    );
  };

  renderItem = ({ item }) => {
    return (
      <Button
        onPress={() => this.onChangeHomeTown(item)}
        textStyle={styles.textButton}
        style={styles.buttonCity}
        buttonTitle={item}
      />
    );
  };

  renderCities = () => {
    return (
      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        data={CITY}
        renderItem={this.renderItem}
        keyExtractor={data => data}
      />
    );
  };

  renderSex = () => {
    return (
      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        data={SEX}
        renderItem={this.renderSexItem}
        keyExtractor={data => data}
      />
    );
  };

  renderSexItem = ({ item }) => {
    return (
      <Button
        onPress={() => this.onChangeSex(item.value)}
        textStyle={styles.textButton}
        style={styles.buttonCity}
        buttonTitle={item.title}
      />
    );
  };

  render() {
    const { isEdit } = this.props;
    const { currentPopupProps } = this.state;
    return (
      <Container>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {isEdit && this.renderHeader()}
            {this.renderInput()}
          </View>
        </KeyboardAwareScrollView>
        <ActionSheet
          ref={(o) => {
            this.ActionSheet = o;
          }}
          title={I18n.t(
            currentPopupProps === 'home_town'
              ? 'userInfo.homeTownPlaceholder'
              : 'userInfo.sexPlaceholder',
          )}
        >
          <View style={styles[currentPopupProps]}>
            {currentPopupProps === 'home_town' && (
              <SearchInput onChange={this.onChangeSearch} />
            )}
            {currentPopupProps === 'home_town' && this.renderCities()}
            {currentPopupProps === 'sex' && this.renderSex()}
          </View>
        </ActionSheet>
      </Container>
    );
  }
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  vInput: {
    marginTop: 35,
    paddingHorizontal: 32,
  },
  txtTitle: {
    paddingBottom: 5,
  },
  buttonCity: {
    backgroundColor: Colors.default,
  },
  textButton: {
    color: Colors.primaryText,
  },
  home_town: {
    height: height * 0.8,
  },
  sex: {
    height: 100,
  },
});

function mapStateToProps(state) {
  return {
    user: state.login.data,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: data => dispatch(LoginActions.signUp(data)),
    editUser: data => dispatch(LoginActions.editUser(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
