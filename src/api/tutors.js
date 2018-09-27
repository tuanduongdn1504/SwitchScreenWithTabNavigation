import { get } from './utils';

export async function searchTutors(data) {
  return data === '' ? get('/tutors') : get(`/tutors?q=${data}`);
}
