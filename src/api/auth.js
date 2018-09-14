import { post, get, patch } from './utils';

export async function register(data) {
  return post('/auth/signup', data);
}

export async function login(data) {
  return post('/auth/login', data);
}

export async function loginfacebook(data) {
  return post('/auth/facebook', data);
}

export async function logout() {
  return post('/auth/logout');
}

export async function forgotPassword(data) {
  return post('/users/password/forgot', data);
}

export async function newPassword(data) {
  return post('/users/password/new', data);
}

export async function updatePassword(data) {
  return post('/users/password/change', data);
}

export async function veriryPasswordToken(data) {
  return post('/users/password/verify', data);
}

export async function getInfor() {
  return get('/users/me');
}

export async function editUser(data) {
  return patch('/users/me', data);
}
