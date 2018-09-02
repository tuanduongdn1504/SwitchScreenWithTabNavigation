import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import { push, showModal } from '../../navigation/navigationActions';
import { qrcode, close } from '../../navigation/navigationButtons';
import { getDataArr } from '../../redux/crudCreator/selectors';
import TutorActions from '../../redux/TutorRedux/actions';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import HomeItem from '../../components/Items/HomeItem';
import Maps from '../../components/Maps';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: {},
    };
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.props.getTutors();
  }

  onPressItem(item) {
    push(this.props.componentId, 'detail', {
      title: I18n.t('detail'),
      rightButtons: [qrcode()],
    });
  }

  onPressMarker = (item) => {
    this.setState({ selectedMarker: item });
  };

  showChatBox = () => {
    showModal('chatBox', {
      title: I18n.t('chatBox'),
      leftButtons: [],
      rightButtons: [close()],
    });
  };

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'add') {
      this.showChatBox();
    }
  };

  renderItem = ({ item, index }) => {
    return (
      <HomeItem
        showQR={this.showQR}
        data={item}
        index={index}
        onPress={() => this.onPressItem(item, index)}
      />
    );
  };

  render() {
    const { tutors } = this.props;
    const { isUpdate, selectedMarker } = this.state;
    return (
      <Container style={styles.container}>
        <CheckUpdate />
        <Maps markers={tutors} selectedMarker={selectedMarker} onPressMarker={this.onPressMarker} />
        <FlatList
          horizontal
          style={styles.list}
          extraData={isUpdate}
          data={tutors}
          renderItem={this.renderItem}
          keyExtractor={data => data.objectId}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          ListFooterComponent={() => <View style={{ width: 20 }} />}
          ListHeaderComponent={() => <View style={{ width: 20 }} />}
        />
      </Container>
    );
  }
}

Home.propTypes = {
  getTutors: PropTypes.func,
  componentId: PropTypes.string,
  tutors: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: 20,
    position: 'absolute',
    bottom: 20,
  },
});

function mapStateToProps(state) {
  return {
    tutors: getDataArr(state, 'tutor'),
    loading: state.tutor.loading,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTutors: () => dispatch(TutorActions.getAllTutor()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
