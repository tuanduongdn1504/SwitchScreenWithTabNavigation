import { makeReducerCreator } from '../../utils/reduxUtils';
import { makeCRUDReducerCreator, INITIAL_CRUD_STATE } from '../crudCreator/reducer';
import { MODEL, IGNORE_ACTIONS } from './actions';

const reducer = makeReducerCreator(INITIAL_CRUD_STATE, {
  ...makeCRUDReducerCreator(MODEL, IGNORE_ACTIONS),
});

export default reducer;
