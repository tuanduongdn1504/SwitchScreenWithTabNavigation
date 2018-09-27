import _ from 'lodash';
import Immutable from 'seamless-immutable';
import { PRIMARY_KEY } from './actions';

export const INITIAL_CRUD_STATE = Immutable({
  loading: false,
  itemloadings: {},
  error: null,
  data: {},
  ids: [],
  current: {},
  filter: {},
  page: 0,
  pageSize: 10,
  sort: '',
});
// getAll

export const getAll = (state, { data }) => state.merge({
  loading: true,
  error: null,
  ...data,
});

export const getAllSuccess = (state, { data }) => state.merge({
  loading: false,
  ...data,
});

export const getAllFailure = (state, { data }) => state.merge({ ...state, loading: false, error: data });

// getOne

export const setCurrent = (state, { data }) => {
  return state.merge({
    current: data,
    loading: true,
  });
};
export const setCurrentSuccess = (state, { data }) => state.merge({
  data: { ...state.data, [data[PRIMARY_KEY]]: data },
  loading: false,
  current: data,
});

export const setCurrentFailure = (state, { data }) => state.merge({ ...state, loading: false, error: data });

// Create

export const create = state => state.merge({
  error: null,
  loading: true,
});

export const createSuccess = (state, { data }) => state.merge({
  data: { ...state.data, [data[PRIMARY_KEY]]: data },
  ids: [...state.ids, data[PRIMARY_KEY]],
  current: data,
  loading: false,
  error: null,
});

export const createFailure = (state, { data }) => state.merge({
  loading: false,
  error: data,
});

// Edit

export const edit = (state, { data }) => state.merge({
  error: null,
  itemloadings: { ...state.itemloadings, [data[PRIMARY_KEY]]: true },
  loading: true,
});

export const editSuccess = (state, { data }) => state.merge({
  data: { ...state.data, [data[PRIMARY_KEY]]: { ...state.data[data[PRIMARY_KEY]], ...data } },
  itemloadings: { ...state.itemloadings, [data[PRIMARY_KEY]]: false },
  current: { ...state.data[data[PRIMARY_KEY]], ...data },
  error: null,
});

export const editFailure = (state, { data }) => state.merge({
  itemloadings: { ...state.itemloadings, [data[PRIMARY_KEY]]: false },
  error: data,
});

// Delete

export const del = (state, { data }) => {
  return state.merge({
    error: null,
    itemloadings: data[PRIMARY_KEY] ? { ...state.itemloadings, [data[PRIMARY_KEY]]: true } : null,
  });
};

export const delSuccess = (state, { data }) => {
  return state.merge({
    data: data[PRIMARY_KEY] ? { ...state.data, [data[PRIMARY_KEY]]: null } : null,
    itemloadings: data[PRIMARY_KEY] ? { ...state.data, [data[PRIMARY_KEY]]: null } : null,
    error: null,
    current: {},
  });
};

export const delFailure = (state, { data }) => {
  return state.merge({
    itemloadings: data[PRIMARY_KEY] ? { ...state.itemloadings, [data[PRIMARY_KEY]]: false } : null,
    error: data,
  });
};

export const makeCRUDReducerCreator = (resource, ignoreActions = []) => {
  const listReducerHandlers = ignoreActions.indexOf('GET_ALL') > -1
    ? []
    : {
      [`GET_ALL_${_.snakeCase(resource).toUpperCase()}`]: getAll,
      [`GET_ALL_${_.snakeCase(resource).toUpperCase()}_SUCCESS`]: getAllSuccess,
      [`GET_ALL_${_.snakeCase(resource).toUpperCase()}_FAILURE`]: getAllFailure,
    };
  const getOneReducerHandlers = ignoreActions.indexOf('GET_ONE') > -1
    ? []
    : {
      [`GET_ONE_${_.snakeCase(resource).toUpperCase()}`]: setCurrent,
      [`GET_ONE_${_.snakeCase(resource).toUpperCase()}_SUCCESS`]: setCurrentSuccess,
      [`GET_ONE_${_.snakeCase(resource).toUpperCase()}_FAILURE`]: setCurrentFailure,
    };
  const editReducerHandlers = ignoreActions.indexOf('EDIT') > -1
    ? []
    : {
      [`EDIT_${_.snakeCase(resource).toUpperCase()}`]: edit,
      [`EDIT_${_.snakeCase(resource).toUpperCase()}_SUCCESS`]: editSuccess,
      [`EDIT_${_.snakeCase(resource).toUpperCase()}_FAILURE`]: editFailure,
    };
  const createReducerHandlers = ignoreActions.indexOf('CREATE') > -1
    ? []
    : {
      [`CREATE_${_.snakeCase(resource).toUpperCase()}`]: create,
      [`CREATE_${_.snakeCase(resource).toUpperCase()}_SUCCESS`]: createSuccess,
      [`CREATE_${_.snakeCase(resource).toUpperCase()}_FAILURE`]: createFailure,
    };
  const delReducerHandlers = ignoreActions.indexOf('DELETE') > -1
    ? []
    : {
      [`DELETE_${_.snakeCase(resource).toUpperCase()}`]: del,
      [`DELETE_${_.snakeCase(resource).toUpperCase()}_SUCCESS`]: delSuccess,
      [`DELETE_${_.snakeCase(resource).toUpperCase()}_FAILURE`]: delFailure,
    };

  return {
    ...listReducerHandlers,
    ...getOneReducerHandlers,
    ...editReducerHandlers,
    ...createReducerHandlers,
    ...delReducerHandlers,
  };
};
