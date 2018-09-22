import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, FlatList, Platform, Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { push, showModal } from '../../navigation/navigationActions';
import { close, chat } from '../../navigation/navigationButtons';
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
import { FILTER } from '../../localData';

class Home extends Component {
  // static options() {
  //   return {
  //     topBar: {
  //       drawBehind: true,
  //       visible: false,
  //       animate: false,
  //     },
  //   };
  // }

  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: {},
      filter: 'Tutor name',
    };
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const { getTutors } = this.props;
    getTutors();
  }

  onPressItem(item) {
    this.props.getOneTutor(item);
    push(this.props.componentId, 'detail', {
      title: I18n.t('tutorDetail'),
      rightButtons: [chat()],
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

  onChangeItem = (currentPopupProps, value) => {
    this.setState({ [currentPopupProps]: value });
    this.ActionSheet.hide();
  };

  blurSearch = () => {
    this.setState({ isShowSearch: false });
    Navigation.dismissOverlay('searchResults');
  };

  focusSearch = () => {
    this.setState({ isShowSearch: true });
    Navigation.showOverlay({
      component: {
        id: 'searchResults',
        name: 'searchResults',
        passProps: {},
        options: {
          overlay: {
            interceptTouchOutside: false,
          },
        },
      },
    });
  };

  showFilter = () => {
    showModal('filter', {
      title: I18n.t('filter.text'),
      leftButtons: [],
      rightButtons: [close()],
    });
    // this.setState({ currentPopupProps: name }, () => {
    //   this.ActionSheet.show();
    // });
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

  render() {
    const { tutors } = this.props;
    const {
      isUpdate, selectedMarker, currentPopupProps, isShowSearch,
    } = this.state;
    return (
      <Container style={styles.container}>
        <CheckUpdate />
        <View style={styles.header}>
          <View style={styles.search}>
            {!isShowSearch && (
              <Icon name="ios-options" size={24} style={styles.icon} onPress={this.showFilter} />
            )}
            <SearchInput
              isFocus={isShowSearch}
              onClose={this.blurSearch}
              onFocus={this.focusSearch}
              onChange={this.onChangeSearch}
              style={{ flex: 1, marginBottom: 0 }}
            />
          </View>
        </View>
        <View style={styles.vMap}>
          <Maps
            markers={tutors}
            selectedMarker={selectedMarker}
            onPressMarker={this.onPressMarker}
          />
        </View>
        <View style={styles.space} />
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
  getUser: PropTypes.func,
};

const { height } = Dimensions.get('window');

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
  space: {
    height: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: Colors.default,
  },
  vMap: {
    height: (height * 2) / 5,
  },
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
