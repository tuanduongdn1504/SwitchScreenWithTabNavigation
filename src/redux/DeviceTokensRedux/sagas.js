import DeviceTokensActions, { MODEL, IGNORE_ACTIONS } from './actions';
import rootCRUDSaga from '../crudCreator/saga';

export default [...rootCRUDSaga(MODEL, IGNORE_ACTIONS, DeviceTokensActions)];
