import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';
import {
  seamlessImmutableReconciler,
  seamlessImmutableTransformCreator,
} from 'redux-persist-seamless-immutable';

const APP_CONFIG = {
  BASE_URL: Config.BASE_URL,
  PARSE_ID: Config.PARSE_ID,
  REST_API_KEY: Config.REST_API_KEY,
  ClOUDINARY_API_KEY: Config.ClOUDINARY_API_KEY,
  ClOUDINARY_API_SECRET: Config.ClOUDINARY_API_SECRET,
  ClOUDINARY_CLOUD_NAME: Config.ClOUDINARY_CLOUD_NAME,
  CLOUNDINARY_AVATAR_URL: Config.CLOUNDINARY_AVATAR_URL,
};

const transformerConfig = {
  whitelistPerReducer: {
    root: ['login', 'token', 'isFirstTime'],
  },
  // blacklistPerReducer: {
  //   reducerB: ['keyC', 'keyD'],
  // },
};

export const REDUX_PERSIST = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  whitelist: ['login'],
  stateReconciler: seamlessImmutableReconciler,
  transforms: [seamlessImmutableTransformCreator(transformerConfig)],
};

export default APP_CONFIG;
