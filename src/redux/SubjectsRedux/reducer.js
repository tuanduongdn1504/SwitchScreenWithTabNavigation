import Immutable from 'seamless-immutable';
import { makeReducerCreator } from '../../utils/reduxUtils';
import { makeCRUDReducerCreator, INITIAL_CRUD_STATE } from '../crudCreator/reducer';
import { MODEL, IGNORE_ACTIONS } from './actions';
import { PRIMARY_KEY } from '../crudCreator/actions';

export const INITIAL_STATE = Immutable({
  ...INITIAL_CRUD_STATE,
  // this is test data
  userCreateSubjects: [],
});

export const createSuccess = (state, { data }) => state.merge({
  data: { ...state.data, [data[PRIMARY_KEY]]: data },
  ids: [...state.ids, data[PRIMARY_KEY]],
  userCreateSubjects: [...state.userCreateSubjects, data],
  current: data,
  loading: false,
  error: null,
});

const reducer = makeReducerCreator(INITIAL_STATE, {
  ...makeCRUDReducerCreator(MODEL, IGNORE_ACTIONS),
  CREATE_SUBJECTS_SUCCESS: createSuccess,
});

export default reducer;
