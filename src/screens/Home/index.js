import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, Platform } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { push, showModal } from '../../navigation/navigationActions';
import { close } from '../../navigation/navigationButtons';
import { getDataArr } from '../../redux/crudCreator/selectors';
import TutorActions from '../../redux/TutorRedux/actions';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import HomeItem from '../../components/Items/HomeItem';
import Divider from '../../components/Divider';
import Maps from '../../components/Maps';
import SearchInput from '../../components/SearchInput';
import { Colors } from '../../themes';
import ActionSheet from '../../components/ActionSheet';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { TUTOR_INFO, FILTER } from '../../localData';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: {},
      filter: 'Tutor name',
    };
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.props.getTutors();
  }

  onPressItem(item) {
    this.props.getOneTutor(item);
    push(this.props.componentId, 'detail', {
      title: I18n.t('tutorDetail'),
    });
  }

  onPressMarker = item => {
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

  renderOption = ({ item }) => {
    const { currentPopupProps } = this.state;
    return (
      <Button
        onPress={() => this.onChangeItem(currentPopupProps, item.value)}
        textStyle={styles.textButton}
        style={styles.item}
        buttonTitle={item.value}
      />
    );
  };

  // renderSelect = (key, data) => {
  //   return (
  //     <FlatList
  //       ItemSeparatorComponent={() => <Divider />}
  //       data={data}
  //       renderItem={this.renderOption(key)}
  //       keyExtractor={item => item.id}
  //       ListHeaderComponent={() => <View style={{ width: 10 }} />}
  //       ListFooterComponent={() => <View style={{ width: 10 }} />}
  //     />
  //   );
  // };

  renderSelect = () => {
    const { currentPopupProps } = this.state;
    if (!currentPopupProps) {
      return <View />;
    }
    return (
      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        data={FILTER}
        renderItem={this.renderOption}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <View style={{ width: 10 }} />}
        ListFooterComponent={() => <View style={{ width: 10 }} />}
      />
    );
  };

  onChangeItem = (currentPopupProps, value) => {
    this.setState({ [currentPopupProps]: value });
    this.ActionSheet.hide();
  };

  showPopup = name => () => {
    this.setState({ currentPopupProps: name }, () => {
      this.ActionSheet.show();
    });
  };

  render() {
    const { tutors } = this.props;
    const { isUpdate, selectedMarker, currentPopupProps, filter } = this.state;
    return (
      <Container style={styles.container}>
        <CheckUpdate />
        <View style={styles.header}>
          <Text type="normalBold" style={styles.headerText}>
            {`Filter by ${filter}`}
          </Text>
          <View style={styles.search}>
            <Icon
              name="ios-options"
              size={24}
              style={styles.icon}
              onPress={this.showPopup('filter')}
            />
            <SearchInput
              onChange={this.onChangeSearch}
              style={{ flex: 1, marginBottom: 0 }}
            />
          </View>
        </View>

        <Maps
          markers={tutors}
          selectedMarker={selectedMarker}
          onPressMarker={this.onPressMarker}
        />
        <FlatList
          style={styles.list}
          extraData={isUpdate}
          data={tutors}
          renderItem={this.renderItem}
          keyExtractor={data => data.objectId}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider />}
          ListFooterComponent={() => <View style={{ width: 20 }} />}
          ListHeaderComponent={() => <View style={{ width: 20 }} />}
        />
        {/* <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={I18n.t(`home.${currentPopupProps}Placeholder`)}
        >
          <View style={styles.select}>
            {currentPopupProps === 'filter' &&
              this.renderSelect('filter', FILTER)}
          </View>
        </ActionSheet> */}
        <ActionSheet
          ref={o => {
            this.ActionSheet = o;
          }}
          title={I18n.t(`home.${currentPopupProps}Placeholder`)}
        >
          <View style={styles.select}>{this.renderSelect()}</View>
        </ActionSheet>
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
    flex: 1,
  },
  search: {
    flexDirection: 'row',
    // marginTop: Platform.OS === 'ios' ? 48 : 23,
    // marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: Colors.primaryText,
    marginLeft: 20,
  },
  item: {
    backgroundColor: 'transparent',
  },
  textButton: {
    color: Colors.primaryText,
  },
  select: {
    paddingBottom: 50,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 48 : 23,
    marginBottom: 10,
  },
  headerText: { paddingLeft: 60, paddingBottom: 10 },
});

function mapStateToProps(state) {
  return {
    tutors: getDataArr(state, 'tutor'),
    loading: state.tutor.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTutors: () => dispatch(TutorActions.getAllTutor()),
    getOneTutor: data => dispatch(TutorActions.getOneTutor(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
