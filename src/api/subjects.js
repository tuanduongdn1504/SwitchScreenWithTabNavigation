import { get } from './utils';

export async function searchSubjects(data) {
  return data === '' ? get('/subjects') : get(`/subjects?name=${data}`);
}
