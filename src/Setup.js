import { Navigation } from 'react-native-navigation';
import configI18n from './i18n/index';
import { registerScreens } from './navigation/screens';
import { iconsLoaded } from './utils/appIcons';
import configureStore from './redux/store';
import Actions from './redux/AppRedux/actions';

global.defaultImage = [
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=441&w=500',
];

const App = () => {
  configI18n();
  const loadStore = async () => {
    return new Promise(resolve => {
      configureStore((store, persistor) => {
        registerScreens(store, persistor);
        resolve(store, persistor);
      });
    });
  };
  const loadIntial = () => {
    return Promise.all([loadStore(), iconsLoaded])
      .then(response => {
        const store = response[0];
        const { token } = store.getState().login;
        global.token = token;
        store.dispatch(Actions.startup());
      })
      .catch(err => console.log(err));
  };

  Navigation.events().registerAppLaunchedListener(async () => {
    await loadIntial();
  });
};

export default App;
