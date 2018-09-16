import { makeActionCreator, makeConstantCreator } from '../../utils/reduxUtils';

export const LoginTypes = makeConstantCreator('SIGN_IN', 'SIGN_IN_SUCCESS', 'SIGN_IN_FAILURE');

const signIn = data => makeActionCreator(LoginTypes.SIGN_IN, { data });
const signInSuccess = (response, role) => makeActionCreator(LoginTypes.SIGN_IN_SUCCESS, { response, role });
const signInFailure = error => makeActionCreator(LoginTypes.SIGN_IN_FAILURE, { error });

export default {
  signIn,
  signInSuccess,
  signInFailure,
};
