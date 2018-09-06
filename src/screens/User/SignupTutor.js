import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Container from '../../components/Container';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import Text from '../../components/Text';
import ButtonRightIcon from '../../components/ButtonRightIcon';
import ActionSheet from '../../components/ActionSheet';
import { TYPES, LEVELS } from '../../localData';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import LoginActions from '../../redux/LoginRedux/actions';
import { startWithTabs } from '../../navigation/navigationActions';

class SignupTutor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  }

  renderInput = () => {
    const { types, levels } = this.state;

    return (
      <View style={styles.vInput}>
        <Text type="subTextBlack" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.levels')}
        </Text>
        <ButtonRightIcon
          onPress={this.showPopup('levels')}
          textColor={levels ? Colors.primaryText : Colors.divider}
          title={levels || I18n.t('userInfo.tutor.levelsPlaceholder')}
        />
        <Text type="subTextBlack" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.types')}
        </Text>
        <ButtonRightIcon
          onPress={this.showPopup('types')}
          textColor={types ? Colors.primaryText : Colors.divider}
          title={types || I18n.t('userInfo.tutor.typesPlaceholder')}
        />
        <Button
          style={styles.button}
          onPress={this.handleRegister}
          buttonTitle={I18n.t('userInfo.register')}
        />
      </View>
    );
  };

  renderItem = key => ({ item }) => {
    return (
      <Button
        onPress={() => this.onChangeItem(key, item)}
        textStyle={styles.textButton}
        style={styles.item}
        buttonTitle={item.value}
      />
    );
  };

  renderSelect = (key, data) => {
    return (
      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        data={data}
        renderItem={this.renderItem(key)}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <View style={{ width: 10 }} />}
        ListFooterComponent={() => <View style={{ width: 10 }} />}
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
          ref={o => {
            this.ActionSheet = o;
          }}
        >
          <View style={styles.select}>
            {currentPopupProps === 'levels' &&
              this.renderSelect('levels', LEVELS)}
            {currentPopupProps === 'types' && this.renderSelect('types', TYPES)}
          </View>
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
    backgroundColor: Colors.default,
  },
  textButton: {
    color: Colors.primaryText,
  },
  select: {
    paddingBottom: 50,
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
