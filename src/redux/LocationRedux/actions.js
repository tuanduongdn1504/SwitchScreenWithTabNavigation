import { makeActionCreator } from '../../utils/reduxUtils';

export const Types = {
  MAP_LOCATION_REQUEST: 'MAP_LOCATION_REQUEST',
  MAP_LOCATION_RECEIVE: 'MAP_LOCATION_RECEIVE',
  MAP_LOCATION_FAILURE: 'MAP_LOCATION_FAILURE',
};

const requestLocation = isUpdateInfo => makeActionCreator(Types.MAP_LOCATION_REQUEST, { isUpdateInfo });
const receiveLocation = (latitude, longitude, location) => makeActionCreator(Types.MAP_LOCATION_RECEIVE, { latitude, longitude, location });
const receiveLocationFailure = errorCode => makeActionCreator(Types.MAP_LOCATION_FAILURE, { errorCode });

export default {
  requestLocation,
  receiveLocation,
  receiveLocationFailure,
};
