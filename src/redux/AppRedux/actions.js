import { makeActionCreator } from '../../utils/reduxUtils';

export const Types = {
  STARTUP: 'STARTUP',
  LOADING: 'LOADING',
  CLEAR_LOADING: 'CLEAR_LOADING',
};

const startup = () => makeActionCreator(Types.STARTUP);
export const loading = () => makeActionCreator(Types.LOADING);
export const clearLoading = () => makeActionCreator(Types.CLEAR_LOADING);
export default {
  startup,
  loading,
  clearLoading,
};
