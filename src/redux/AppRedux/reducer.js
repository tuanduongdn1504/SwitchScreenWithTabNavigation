import Immutable from 'seamless-immutable';
import { Types } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  loading: null,
});
const loading = state => {
  return state.merge({
    loading: true,
  });
};

const clearLoading = state => {
  return state.merge({
    loading: false,
  });
};
const ACTION_HANDLERS = {
  [Types.LOADING]: loading,
  [Types.CLEAR_LOADING]: clearLoading,
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
