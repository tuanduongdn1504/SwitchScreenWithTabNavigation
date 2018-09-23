import Immutable from 'seamless-immutable';
import { Types } from './actions';
import { makeReducerCreator } from '../../utils/reduxUtils';

export const INITIAL_STATE = Immutable({
  latitude: null,
  longitude: null,
  fetching: false,
  error: null,
});

const request = state => {
  return state.merge({
    fetching: true,
    error: false,
  });
};

const receive = (state, action) => state.merge({
  fetching: false,
  latitude: action.latitude,
  longitude: action.longitude,
  location: action.location,
  error: null,
});

const failure = state => state.merge({
  fetching: false,
  error: true,
});

const ACTION_HANDLERS = {
  [Types.MAP_LOCATION_REQUEST]: request,
  [Types.MAP_LOCATION_RECEIVE]: receive,
  [Types.MAP_LOCATION_FAILURE]: failure,
};

export default makeReducerCreator(INITIAL_STATE, ACTION_HANDLERS);
