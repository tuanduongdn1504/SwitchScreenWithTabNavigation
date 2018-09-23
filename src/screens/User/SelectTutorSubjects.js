import React, { Component } from 'react';
import {
  View, StyleSheet, Dimensions, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Container from '../../components/Container';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Chip from '../../components/Chip';
import SearchInput from '../../components/SearchInput';
import LoginActions from '../../redux/LoginRedux/actions';
import { startWithTabs, showInAppNoti } from '../../navigation/navigationActions';
import { getDataArr } from '../../redux/crudCreator/selectors';

class SelectTutorSubjects extends Component {
  constructor(props) {
    super(props);
    const { tutor_info } = props.user;
    this.state = {
      selected: tutor_info?[...tutor_info.subjects]:[],
    };
    this.data = {};
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'skip') {
      startWithTabs();
    }
  };

  submitData = () => {
    const {
      isFromMenu, componentId, becomeTutor, user,
    } = this.props;
    // const { types, levels } = this.data;
    const { selected } = this.state;
    if (selected.length === 0) {
      showInAppNoti('', I18n.t('error.becomeTutor.subjects'), 'error');
      return;
    }
    const data = {
      about: user.tutor_info.about,
      availability: user.tutor_info.availability,
      subjects: selected,
    };
    becomeTutor(data);
    if (isFromMenu) {
      Navigation.popToRoot(componentId);
    } else {
      startWithTabs();
    }
  };

  selectSubject = item => {
    const { selected } = this.state;
    this.setState({ selected: _.xor(selected, [item]) });
  };

  renderHeader = () => {
    return (
      <View style={styles.vHeader}>
        <SearchInput />
      </View>
    );
  };

  renderSelected = () => {
    const { selected } = this.state;
    const {subjects} = this.props;
    return (
      <View style={styles.vSelected}>
        <View style={styles.row}>
          <Text type="headline" style={[styles.txtTitle, { flex: 1 }]}>
            {I18n.t('userInfo.tutor.subjectSelected')}
          </Text>
          <Button
            style={styles.btnAdd}
            onPress={this.addSubject}
            startColor={Colors.default}
            endColor={Colors.default}
            ionicons="md-add"
            isShadow
            textStyle={{ color: Colors.primary }}
            buttonTitle={I18n.t('button.add')}
          />
        </View>
        <View style={styles.vWrapper}>
          {selected.length === 0 ? (
            <Text color={Colors.secondaryText}>{I18n.t('empty.unselect')}</Text>
          ) : (
            selected.map(data => (
              <Chip
                color={Colors.primaryText}
                text={subjects[data].name}
                key={data}
                onPress={() => this.selectSubject(data)}
              />
            ))
          )}
        </View>
      </View>
    );
  };

  renderUnselect = () => {
    const { subjects, ids } = this.props;
    const { selected } = this.state;
    return (
      <View style={styles.vUnselect}>
        <Text type="headline" style={styles.txtTitle}>
          {I18n.t('userInfo.tutor.suggestionSubjects')}
        </Text>
        <View style={styles.vWrapper}>
          {subjects.length === 0 ? (
            <Text color={Colors.secondaryText}>{I18n.t('empty.unselect')}</Text>
          ) : (
            ids.map(data => (
              <Chip
                color={
                  selected.indexOf(data) > -1 ? Colors.primaryText : Colors.default
                }
                text={subjects[data].name}
                key={subjects[data].id}
                onPress={() => this.selectSubject(data)}
              />
            ))
          )}
        </View>
      </View>
    );
  };

  render() {
    // const { isEdit } = this.props;
    return (
      <Container style={styles.container}>
        <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
          {this.renderHeader()}
          <View style={styles.vContent}>
            {this.renderSelected()}
            {this.renderUnselect()}
          </View>
        </ScrollView>
        <Button
          style={styles.button}
          onPress={this.submitData}
          buttonTitle={I18n.t('button.confirm')}
        />
      </Container>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  vHeader: {
    backgroundColor: Colors.default,
  },
  vSelected: {
    width: width - 40,
  },
  vUnselect: {
    paddingVertical: 20,
    paddingBottom: 100,
    width: width - 40,
  },
  txtTitle: {},
  vContent: {
    flex: 1,
    width,
    paddingHorizontal: 20,
  },
  vWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 40,
    marginTop: 20,
  },
  button: {
    width: width - 40,
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  btnAdd: {
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

SelectTutorSubjects.propTypes = {
  subjects: PropTypes.object,
  // isEdit: PropTypes.bool,
  isFromMenu: PropTypes.bool,
  componentId: PropTypes.string,
  ids: PropTypes.array
};

function mapStateToProps(state) {
  return {
    user: state.login.data,
    ids: state.subjects.ids,
    subjects: state.subjects.data
  };
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: data => dispatch(LoginActions.signUp(data)),
    editUser: data => dispatch(LoginActions.editUser(data)),
    becomeTutor: data => dispatch(LoginActions.becomeTutor(data)),
    getAllSubjects: data => dispatch(SubjectsActions.getAllSubjects(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectTutorSubjects);
