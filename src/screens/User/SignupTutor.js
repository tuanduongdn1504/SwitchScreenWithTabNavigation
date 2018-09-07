import React, { Component } from 'react';
import {
  View, StyleSheet, FlatList, Dimensions,
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Container from '../../components/Container';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import Text from '../../components/Text';
import ButtonRightIcon from '../../components/ButtonRightIcon';
import ActionSheet from '../../components/ActionSheet';
import { TUTOR_INFO } from '../../localData';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import LoginActions from '../../redux/LoginRedux/actions';
import { startWithTabs } from '../../navigation/navigationActions';

class SignupTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPopupProps: '',
    };
    this.data = {};
  }

  submitData = () => {
    // const { types, levels } = this.data;
    // const { isEdit, editUser, signUp } = this.props;
    // const data = {
    //   types, levels
    // };
  };

  showPopup = name => () => {
    this.setState({ currentPopupProps: name }, () => {
      this.ActionSheet.show();
    });
  };

  _focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  handleRegister = () => {
    startWithTabs();
  };

  onChangeItem = (currentPopupProps, item) => {
    const { subjects } = this.state;
    const data = currentPopupProps === 'subjects' ? _.xor(subjects, [item]) : item;
    this.setState({ [currentPopupProps]: data });
  };

  renderInput = () => {
    const { types, levels, subjects } = this.state;

    return (
      <View style={styles.vInput}>
        <Text type="subTextBlack" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.levels')}
        </Text>
        <ButtonRightIcon
          onPress={this.showPopup('levels')}
          textColor={levels ? Colors.primaryText : Colors.divider}
          title={levels ? levels.value : I18n.t('userInfo.tutor.levelsPlaceholder')}
        />
        <Text type="subTextBlack" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.types')}
        </Text>
        <ButtonRightIcon
          onPress={this.showPopup('types')}
          textColor={types ? Colors.primaryText : Colors.divider}
          title={types ? types.value : I18n.t('userInfo.tutor.typesPlaceholder')}
        />
        <Text type="subTextBlack" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.subjects')}
        </Text>
        <ButtonRightIcon
          onPress={this.showPopup('subjects')}
          textColor={subjects ? Colors.primaryText : Colors.divider}
          title={
            Array.isArray(subjects) && subjects.length > 0
              ? subjects.map(data => data.value).join(', ')
              : I18n.t('userInfo.tutor.subjectsPlaceholder')
          }
        />
        <Button
          style={styles.button}
          onPress={this.handleRegister}
          buttonTitle={I18n.t('userInfo.register')}
        />
      </View>
    );
  };

  renderItem = ({ item }) => {
    const { currentPopupProps } = this.state;
    return (
      <Button
        onPress={() => this.onChangeItem(currentPopupProps, item)}
        textStyle={styles.textButton}
        style={styles.item}
        buttonTitle={item.value}
      />
    );
  };

  renderSelect = () => {
    const { currentPopupProps } = this.state;
    if (currentPopupProps === '') {
      return <View />;
    }
    return (
      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        data={TUTOR_INFO[currentPopupProps]}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <View style={{ width: 10 }} />}
        ListFooterComponent={() => <View style={{ width: 10 }} />}
      />
    );
  };

  render() {
    const { isEdit } = this.props;
    return (
      <Container>
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            {isEdit && this.renderHeader()}
            {this.renderInput()}
          </View>
        </KeyboardAwareScrollView>
        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
        >
          <View style={styles.select}>{this.renderSelect()}</View>
        </ActionSheet>
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  vInput: {
    marginTop: 35,
    paddingHorizontal: 20,
  },
  txtTitle: {
    paddingBottom: 5,
  },
  item: {
    backgroundColor: 'transparent',
  },
  textButton: {
    color: Colors.primaryText,
  },
  select: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    height: 40,
    width: width - 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    marginTop: 20,
  },
});

function mapStateToProps(state) {
  return {
    user: state.login.data,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => dispatch(LoginActions.signUp(data)),
    editUser: data => dispatch(LoginActions.editUser(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupTutor);
