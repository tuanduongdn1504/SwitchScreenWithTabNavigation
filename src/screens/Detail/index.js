import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
// import Text from '../../components/Text';
// import Profile from './Profile';
import { Colors } from '../../themes';
import TutorInfo from './TutorInfo';
import TutorsActions from '../../redux/TutorsRedux/actions';
import { close } from '../../navigation/navigationButtons';
import { showModal, push } from '../../navigation/navigationActions';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const { getOneTutors, item } = this.props;
    getOneTutors(item);
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'chat') {
      this.showChatBox();
    }
  };

  showChatBox = () => {
    push(this.props.componentId, 'chatBox', {
      title: I18n.t('chatBox'),
      // leftButtons: [],
      // rightButtons: [close()],
      passProps: {
        receive: this.props.tutor,
      },
    });
  };

  render() {
    const { tutor } = this.props;
    return (
      //       <View>
      //         <Profile />
      //       </View>
      <ScrollView style={styles.container}>
        <TutorInfo data={tutor} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },
});

function mapStateToProps(state) {
  return {
    tutor: state.tutors.current,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getOneTutors: data => dispatch(TutorsActions.getOneTutors(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
