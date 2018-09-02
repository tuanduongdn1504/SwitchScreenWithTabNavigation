import _ from 'lodash';
import { makeReducerCreator } from '../../utils/reduxUtils';
import { makeCRUDReducerCreator, INITIAL_CRUD_STATE } from '../crudCreator/reducer';
import { MODEL, IGNORE_ACTIONS } from './actions';
import { DUMMY_USER_DATA } from '../../localData/index';

export const INITIAL_STATE = {
  ...INITIAL_CRUD_STATE,
  // this is test data
  data: _.keyBy(DUMMY_USER_DATA, 'id'),
  ids: DUMMY_USER_DATA.map(data => data.id),
};

const reducer = makeReducerCreator(INITIAL_STATE, {
  ...makeCRUDReducerCreator(MODEL, IGNORE_ACTIONS),
});

export default reducer;
