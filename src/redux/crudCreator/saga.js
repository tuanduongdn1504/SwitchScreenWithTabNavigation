import {
  takeLatest, put, call, fork,
} from 'redux-saga/effects';
import _ from 'lodash';
import { apiWrapper } from '../../utils/reduxUtils';
import {
  getAllApi, getOneApi, postApi, putApi, delApi,
} from '../../api/crud';
import { makeActionName, upperFirstChar } from '../../utils/textUtils';
import { PRIMARY_KEY, CRUD_ACTIONS } from './actions';
import { showInAppNoti } from '../../navigation/navigationActions';

function* getAllSaga(data, resource, successAction, failureAction) {
  try {
    // const { pageSize, page } = yield select(state => state[resource]);
    const convertRequest = {
      // limit: pageSize,
      // skip: page === 0 ? 0 : pageSize * (page - 1),
      // count: 1,
      ...data,
    };
    const response = yield call(apiWrapper, true, getAllApi, resource, convertRequest);
    if (response.success) {
      const result = _.omit(response, ['success', 'data']);
      yield put(
        successAction({
          ids: response.data.map(item => item[PRIMARY_KEY]),
          data: _.keyBy(response.data, PRIMARY_KEY),
          ...result,
        }),
      );
    } else {
      // showInAppNoti('', response.message, 'error');
      yield put(failureAction(response));
    }
  } catch (error) {
    showInAppNoti('', 'Something wrong!', 'error');
    yield put(failureAction(error));
  }
}

function* getOneSaga(data, resource, successAction, failureAction) {
  try {
    const response = yield call(
      apiWrapper,
      true,
      getOneApi,
      upperFirstChar(resource),
      data[PRIMARY_KEY],
    );
    if (response.success) {
      yield put(successAction(response.results));
    } else {
      yield put(failureAction(response));
    }
  } catch (error) {
    yield put(failureAction(error));
  }
}

function* editSaga(data, resource, successAction, failureAction, getOne) {
  // delete data.c
  try {
    const response = yield call(
      apiWrapper,
      true,
      putApi,
      upperFirstChar(resource),
      data[PRIMARY_KEY],
      data,
    );
    if (!response.error) {
      yield put(successAction({ ...data, ...response }));
      yield put(getOne({ objectId: data.objectId }));
    } else {
      yield put(failureAction(response));
    }
  } catch (error) {
    //
  }
}

function* createSaga(data, resource, successAction, failureAction) {
  try {
    const response = yield call(apiWrapper, true, postApi, resource, data);
    if (response.success) {
      yield put(successAction(response.data));
    } else {
      showInAppNoti('', response.message, 'error');
      yield put(failureAction(response));
    }
  } catch (error) {
    //
  }
}

function* delSaga(data, resource, successAction, failureAction) {
  try {
    const response = yield call(apiWrapper, true, delApi, resource, data[PRIMARY_KEY]);
    console.log('apiWrapper', apiWrapper);
    console.log('resource', resource);
    console.log('data[PRIMARY_KEY]', data[PRIMARY_KEY]);
    console.log('DEBUG RESPONSE: ', response);
    if (response.success) {
      yield put(successAction(response.data || {}));
    } else {
      yield put(failureAction(response));
    }
  } catch (error) {
    //
  }
}

const makeCRUDSagaCreator = (resource, actions) => {
  function* getAllSagaCreator({ data }) {
    yield fork(
      getAllSaga,
      data,
      resource,
      actions[makeActionName(`GET_ALL_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`GET_ALL_${_.snakeCase(resource).toUpperCase()}_FAILURE`)],
    );
  }
  function* getOneSagaCreator({ data }) {
    yield fork(
      getOneSaga,
      data,
      resource,
      actions[makeActionName(`GET_ALL_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`GET_ALL_${_.snakeCase(resource).toUpperCase()}_FAILURE`)],
    );
  }
  function* editSagaCreator({ data }) {
    yield fork(
      editSaga,
      data,
      resource,
      actions[makeActionName(`EDIT_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`EDIT_${_.snakeCase(resource).toUpperCase()}_FAILURE`)],
      getOneSaga,
    );
  }
  function* deleteSagaCreator({ data }) {
    yield fork(
      delSaga,
      data,
      resource,
      actions[makeActionName(`DELETE_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`DELETE_${_.snakeCase(resource).toUpperCase()}_FAILURE`)],
    );
  }
  function* createSagaCreator({ data }) {
    yield fork(
      createSaga,
      data,
      resource,
      actions[makeActionName(`CREATE_${_.snakeCase(resource).toUpperCase()}_SUCCESS`)],
      actions[makeActionName(`CREATE_${_.snakeCase(resource).toUpperCase()}_FAILURE`)],
    );
  }
  const sagas = {
    GET_ALL: getAllSagaCreator,
    GET_ONE: getOneSagaCreator,
    EDIT: editSagaCreator,
    DELETE: deleteSagaCreator,
    CREATE: createSagaCreator,
  };
  return sagas;
};

const rootCRUDSaga = (resource, ignoreActions = [], actions) => {
  const sagaCreators = makeCRUDSagaCreator(resource, actions);
  const acceptActions = _.xor(CRUD_ACTIONS, ignoreActions);
  return acceptActions.map(data => takeLatest(`${data}_${_.snakeCase(resource).toUpperCase()}`, sagaCreators[data]));
};

export default rootCRUDSaga;
