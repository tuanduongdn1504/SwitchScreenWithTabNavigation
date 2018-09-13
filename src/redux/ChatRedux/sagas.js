import {
  take, call, put, takeEvery,
} from 'redux-saga/effects';
import _ from 'lodash';
import { eventChannel } from 'redux-saga';
import ChatActions, { MODEL, IGNORE_ACTIONS, Types } from './actions';
import rootCRUDSaga from '../crudCreator/saga';
import { subscribe, initFirebase } from './firebaseStore';
import { PRIMARY_KEY } from '../crudCreator/actions';

let chatChannel = null;

function createChatChannel(data) {
  return eventChannel(emit => {
    const chatHandler = querySnapshot => {
      const datas = [];
      querySnapshot.forEach(doc => {
        const record = doc.data();
        datas.push({
          key: doc.id,
          ...record,
        });
      });
      emit(datas);
    };
    const unsubscribe = subscribe(chatHandler);
    return () => {
      unsubscribe();
    };
  });
}
// reply with a `pong` message by invoking `socket.emit('pong')`

export function* watchOnChat({ data }) {
  yield call(initFirebase);
  chatChannel = yield call(createChatChannel, data);
  while (true) {
    try {
      const payload = yield take(chatChannel);
      const ids = _.sortBy(payload, data => data.time).reverse();
      yield put(
        ChatActions.getAllChatSuccess({
          data: _.keyBy(payload, 'key'),
          ids: ids.map(item => item.key),
          total: payload.length,
        }),
      );
    } catch (error) {
      chatChannel.close();
    }
  }
}

export function* closeChat() {
  try {
    yield call(chatChannel.close);
  } catch (error) {
    // tesst
  }
}

export default [
  ...rootCRUDSaga(MODEL, IGNORE_ACTIONS, ChatActions),
  takeEvery(Types.WATCH_CHAT, watchOnChat),
  takeEvery(Types.CLOSE_CHAT, closeChat),
];
