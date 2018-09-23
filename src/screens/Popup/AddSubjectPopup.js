import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import {
  View, StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native';
import Text from '../../components/Text';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import { Colors } from '../../themes';
import Container from '../../components/Container';
import { showInAppNoti } from '../../navigation/navigationActions';

class AddSubjects extends Component {
  dismissModal = () => {
    this.props.dismissModal();
  };

  submitSubjects = () => {
    const { name, description } = this;
    const { createSubjects } = this.props;
    if (name.getText() && description.getText()) {
      const data = {
        name: name.getText(),
        description: description.getText(),
      };
      createSubjects(data);
    } else {
      showInAppNoti('', I18n.t('error.becomeTutor.createSubjects'), 'error');
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <TouchableOpacity onPress={this.dismissModal} style={styles.overlay}>
          <View />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text center type="title2">
            {I18n.t('userInfo.tutor.newSubjects')}
          </Text>
          <InputRow
            ref={ref => {
              this.name = ref;
            }}
            textColor={Colors.primary}
            animatedTitle
            underLine
            // onChangeText={this.onChange('email')}
            placeholderTextColor={Colors.divider}
            placeholder={I18n.t('userInfo.tutor.subjectName')}
          />
          <InputRow
            ref={ref => {
              this.description = ref;
            }}
            textColor={Colors.primary}
            animatedTitle
            underLine
            multiline
            placeholderTextColor={Colors.divider}
            placeholder={I18n.t('userInfo.tutor.description')}
          />
          <View style={styles.vRow}>
            <View style={styles.btnCancel}>
              <Button
                onPress={this.dismissModal}
                isShadow
                endColor={Colors.default}
                startColor={Colors.default}
                textStyle={{ color: Colors.primaryText }}
                style={styles.btn}
                buttonTitle={I18n.t('button.cancel')}
              />
            </View>
            <View style={styles.buttonSubmit}>
              <Button
                onPress={this.submitSubjects}
                style={styles.btn}
                buttonTitle={I18n.t('button.submit')}
              />
            </View>
          </View>
        </View>
      </Container>
    );
  }
}
AddSubjects.propTypes = {
  createSubjects: PropTypes.func,
  dismissModal: PropTypes.func,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blur,
    alignItems: 'center',
  },
  content: {
    width: width - 40,
    backgroundColor: Colors.default,
    padding: 20,
    borderRadius: 20,
    marginTop: 60,
  },
  vRow: {
    width: width - 80,
    marginTop: 20,
    flexDirection: 'row',
  },
  buttonSubmit: {
    flex: 1,
  },
  btnCancel: {
    width: 80,
    marginRight: 10,
  },
  btn: {
    height: 40,
    borderRadius: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default AddSubjects;
