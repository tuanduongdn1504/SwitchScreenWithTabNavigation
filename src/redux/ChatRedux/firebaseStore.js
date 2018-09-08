import firebase from 'react-native-firebase';

const fireStore = firebase.firestore();
const modelStore = fireStore.collection('chat');

export const initFirebase = () => {
  // return firebase.auth().signInAnonymously();
};

export const addStore = data => {
  modelStore.add(data);
};

export const updateStore = (key, data) => {
  modelStore.push({
    key,
    ...data,
  });
};

export const subscribe = subcribeFunc => {
  return modelStore.onSnapshot(subcribeFunc);
};

export const getData = (key, data) => {
  modelStore.where('user', '==', data.users.join(','));
};
