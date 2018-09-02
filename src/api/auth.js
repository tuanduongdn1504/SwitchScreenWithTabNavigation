import { post, get, patch } from './utils';

export async function register(data) {
  return post('/auth/signup', data);
}

export async function login(data) {
  return post('/auth/login', data);
}

export async function logout() {
  return post('/auth/logout');
}

export async function forgotPassword(data) {
  // return post('/api/Users/Password/Forgot', data);
}

export async function updatePassword(data) {
  // return post('/api/Users/Password/Forgot', data);
}

export async function getInfor() {
  // return requestApi(queryCustomerProfile);
  return get('/users/me');
}

export async function editUser(data) {
  // return requestApi(queryCustomerProfile);
  return patch('/users/me', data);
}
