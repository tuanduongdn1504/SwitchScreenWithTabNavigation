import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import Actions, { Types } from './actions';
import LoginActions from '../LoginRedux/actions';
import Tools, { findCity } from '../../utils/tools';
import { getArea } from '../../api/locations';

export function* getUserLocation({ isUpdateInfo }) {
  try {
    const { token } = yield select(state => state.login);
    const reslocation = yield call(Tools.userPosition);
    const { latitude, longitude } = reslocation.coords;
    if (latitude && longitude) {
      const response = yield call(getArea, latitude, longitude);
      const formatLocation = findCity(response);
      yield put(Actions.receiveLocation(latitude, longitude, formatLocation));
      if (token) {
        const data = {
          address: formatLocation,
          location: {
            coordinates: [longitude, latitude],
          },
        };
        if (isUpdateInfo) {
          yield put(LoginActions.editUser(data));
        }
      }
    }
  } catch (err) {
    yield put(Actions.receiveLocationFailure(err));
  }
}

const locationSagas = () => {
  return [takeLatest(Types.MAP_LOCATION_REQUEST, getUserLocation)];
};

export default locationSagas();
