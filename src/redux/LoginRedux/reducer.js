import Immutable from 'seamless-immutable';
import { LoginTypes } from './actions';
// import { LoginTypes as AppLoginTypes } from '../AppRedux/actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  data: {},
  error: null,
  loading: null,
  isLogged: false,
  isLogin: false,
  signInType: null,
  token: null,
  isFirstTime: true,
  isPremium: false,
  expired_date: '2018-09-26T10:04:28.550Z',
  setting: {},
});

const signUp = (state, { data }) => {
  return state.merge({
    // remove in live
    error: null,
    signInType: null,
    fbToken: null,
    isLogin: true,
    googleToken: null,
    emailToken: null,
    loading: true,
  });
};

const signUpSuccess = (state, { data }) => state.merge({
  data,
  isLogin: true,
  token: response.token,
  loading: false,
  data: {
    _id: response._id,
  },
});

const signUpFailure = (state, action) => state.merge({
  isLogged: false,
  isLogin: false,
  error: action.error,
  editing: false,
  loading: null,
});

const signIn = (state, action) => {
  return state.merge({
    error: null,
    signInType: null,
    fbToken: null,
    isLogin: true,
    isLogged: false,
    loading: true,
    token: null,
    data: {
      ...action.data,
      id: action.data.username === 'longnguyen' ? 2 : 1,
    },
  });
};

const signInSuccess = (state, { response }) => {
  return state.merge({
    isLogged: true,
    isLogin: false,
    token: response.token,
    loading: false,
    ...response,
  });
};
const signInFailure = (state, action) => state.merge({
  isLogged: false,
  isLogin: false,
  error: action.error,
  editing: false,
  loading: false,
});

const signOut = (state, action) => {
  return state.merge({
    error: null,
    signInType: null,
    fbToken: null,
    isLogged: false,
    isLogin: false,
    token: null,
    data: {},
  });
};

const getUser = (state, action) => {
  return state.merge({
    error: null,
    isFetching: true,
  });
};

const editUser = (state, action) => {
  return state.merge({
    data: { ...state.data, ...action.data },
    error: null,
    isFetching: true,
  });
};

const updateUserSuccess = (state, { data }) => {
  return state.merge({
    data: { ...data },
    error: null,
    isFetching: false,
  });
};

const updateUserFailure = (state, action) => state.merge({
  error: action.errorCode,
  isFetching: false,
});

const fbSignIn = (state, action) => {
  return state.merge({
    isLogin: true,
    error: null,
    isLogged: false,
    token: null,
    loading: true,
  });
};

const fbSignInSuccess = (state, action) => state.merge({
  data: { ...state.data, ...action.response },
  isLogged: true,
  isLogin: false,
  signInType: Types.FB_LOGIN,
  token: action.token,
  loading: false,
});

const fbSignInFailure = (state, action) => state.merge({
  isLogged: false,
  error: action.error,
  isLogin: false,
  token: null,
  loading: false,
});

const preBecomeTutor = (state, { data }) => state.merge({
  data: { ...state.data, tutor_info: { ...data } },
});

const ACTION_HANDLERS = {
  // [AppLoginTypes.STARTUP]: startUp,
  [LoginTypes.SIGN_OUT]: signOut,
  [LoginTypes.SIGN_UP]: signUp,
  [LoginTypes.SIGN_UP_SUCCESS]: signUpSuccess,
  [LoginTypes.SIGN_UP_FAILURE]: signUpFailure,
  [LoginTypes.SIGN_IN]: signIn,
  [LoginTypes.SIGN_IN_SUCCESS]: signInSuccess,
  [LoginTypes.SIGN_IN_FAILURE]: signInFailure,
  [LoginTypes.GET_USE]: getUser,
  [LoginTypes.EDIT_USER]: editUser,
  [LoginTypes.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [LoginTypes.UPDATE_USER_FAILURE]: updateUserFailure,
  [LoginTypes.FB_LOGIN]: fbSignIn,
  [LoginTypes.FB_LOGIN_SUCCESS]: fbSignInSuccess,
  [LoginTypes.FB_LOGIN_FAILURE]: fbSignInFailure,
  [LoginTypes.PRE_BECOME_TUTOR]: preBecomeTutor,
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
