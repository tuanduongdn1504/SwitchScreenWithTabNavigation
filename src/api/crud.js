import { get, post, put } from './utils';

export async function getAllApi(resource, data) {
  return get(`/classes/${resource}`, data);
}

export async function getOneApi(resource, id, data) {
  return get(`/classes/${resource}/${id}`, data);
}

export async function delApi(resource, id) {
  return put(`/classes/${resource}/${id}`, { isActive: false });
}

export async function postApi(resource, data) {
  return post(`/classes/${resource}`, data);
}

export async function putApi(resource, id, data) {
  return put(`/classes/${resource}/${id}`, data);
}
