import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { TUTOR_INFO } from '../../localData';
import Text from '../../components/Text';
import Chip from '../../components/Chip';
import { Colors } from '../../themes';
import { getDataArr } from '../../redux/crudCreator/selectors';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      types: [],
    };
  }

  selectedData = type => item => {
    this.setState({ [type]: _.xor(this.state[type], [item]) });
  };

  render() {
    const { subjects, types } = this.state;
    return (
      <View style={styles.container}>
        <Text type="title26PX">{I18n.t('userInfo.tutor.types.title')}</Text>
        <View style={styles.vSubjects}>
          {TUTOR_INFO.types.map(data => (
            <Chip
              color={_.find(types, data, 'id') ? Colors.primaryText : Colors.default}
              text={data.value}
              onPress={() => this.selectedData('types')(data)}
            />
          ))}
        </View>
        <Text type="title26PX">{I18n.t('userInfo.tutor.subjects')}</Text>
        <View style={styles.vSubjects}>
          {this.props.subjects.map(data => (
            <Chip
              color={_.find(subjects, data, 'id') ? Colors.primaryText : Colors.default}
              text={data.name}
              onPress={() => this.selectedData('subjects')(data)}
            />
          ))}
        </View>
      </View>
    );
  }
}
Filter.propTypes = {
  subjects: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  vSubjects: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    marginBottom: 20,
  },
});

function mapStateToProps(state) {
  return {
    subjects: getDataArr(state, 'subjects'),
  };
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
