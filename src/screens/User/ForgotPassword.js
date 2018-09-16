import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { bindActionCreators } from 'redux';
import { Colors } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import Text from '../../components/Text';
import Actions from '../../redux/ForgotPasswordRedux/actions';

class ForgotPassword extends Component {
  static propTypes = {
    forgotPassword: PropTypes.func,
  };

  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('userInfo.password.forgotPassword'),
        },
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  send = () => {
    const { forgotPassword } = this.props;
    if (this.email.getText()) {
      const data = {
        email: this.email.getText(),
      };
      forgotPassword(data);
    }
  };

  renderDescription = () => {
    return (
      <View style={styles.description}>
        <Text type="body2" color={Colors.primaryText}>
          {I18n.t('userInfo.password.forgotPasswordCaption')}
        </Text>
        <Text type="body3" color={Colors.primaryTextBlur}>
          {I18n.t('userInfo.password.forgotPasswordDescription')}
        </Text>
      </View>
    );
  };

  renderInput = () => (
    <View style={styles.groupInput}>
      <InputRow
        ref={ref => {
          this.email = ref;
        }}
        textColor={Colors.primary}
        animatedTitle
        underLine
        validateType="email"
        // onChangeText={this.onChange('email')}
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.email')}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          {this.renderDescription()}
          {this.renderInput()}
          <Button
            primary
            style={styles.vBtn}
            onPress={this.send}
            buttonTitle={I18n.t('send').toLocaleUpperCase()}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    marginTop: 40,
  },
  description: {
    // marginTop: 40,
  },
  groupInput: {
    marginTop: 20,
  },
  vBtn: {
    width: width - 40,
    marginTop: 40,
  },
});

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
