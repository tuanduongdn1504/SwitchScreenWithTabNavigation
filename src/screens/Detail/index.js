import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
// import Text from '../../components/Text';
// import Profile from './Profile';
import { Colors } from '../../themes';
import TutorInfo from './TutorInfo';
import { close } from '../../navigation/navigationButtons';
import { showModal } from '../../navigation/navigationActions';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'chat') {
      this.showChatBox();
    }
  };

  showChatBox = () => {
    showModal('chatBox', {
      title: I18n.t('chatBox'),
      leftButtons: [],
      rightButtons: [close()],
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
    tutor: state.tutor.current,
  };
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
