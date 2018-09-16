import React, { Component } from 'react';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import RoleView from '../../components/Items/RoleItem';
import { ROLES } from '../../localData';
import Container from '../../components/Container';
import Text from '../../components/Text';
import { Colors } from '../../themes';
import { startWithTabs, push } from '../../navigation/navigationActions';
import { skip } from '../../navigation/navigationButtons';

class SelectRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
    };
  }

  goStudentInfo = () => {
    const { componentId } = this.props;
    push(componentId, 'studentInfo', {
      title: I18n.t('userInfo.student.title'),
    });
  };

  goTutorInfo = () => {
    const { componentId } = this.props;
    push(componentId, 'tutorInfo', {
      title: I18n.t('userInfo.tutor.titleAbout'),
      rightButtons: [skip()],
    });
  };

  goHome = () => {
    startWithTabs();
  };

  selectRole = item => {
    this.setState({ selected: item });
    item.id === 'tutor' ? this.goTutorInfo() : this.goStudentInfo();
  };

  renderRoleView = () => {
    const { selected } = this.state;
    return (
      <View style={styles.vRoles}>
        {ROLES.map(data => (
          <RoleView
            key={data.id}
            isSelected={selected.id === data.id}
            onPress={() => this.selectRole(data)}
            data={data}
          />
        ))}
      </View>
    );
  };

  render() {
    return (
      <Container>
        {this.renderRoleView()}
        <Text
          onPress={this.goHome}
          type="headline"
          center
          underLine
          color={Colors.primary}
          style={styles.txtSkip}
        >
          {I18n.t('userInfo.tutor.skip')}
        </Text>
      </Container>
    );
  }
}
SelectRole.propTypes = {
  componentId: PropTypes.string,
};

const styles = StyleSheet.create({
  vRoles: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 30,
  },
  txtSkip: {
    margin: 20,
    padding: 15,
    borderRadius: 5,
  },
});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectRole);
