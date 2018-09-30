import { get, post } from './utils';
import { PRIMARY_KEY } from '../redux/crudCreator/actions';

export async function searchTutors(data) {
  return data === '' ? get('/tutors') : get(`/tutors?q=${data}`);
}

export async function createReviews(data) {
  return post(`/tutors/${data[PRIMARY_KEY]}/reviews`, data);
}

export async function getAllReviews(data) {
  return get(`/tutors/${data[PRIMARY_KEY]}/reviews`, data);
}
