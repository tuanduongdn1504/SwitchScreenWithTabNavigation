import { get } from './utils';

export async function searchSubjects(data) {
  console.log('data', data);
  return data === '' ? get('/subjects') : get(`/subjects?name=${data}`);
}
