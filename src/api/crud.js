import { get, post, put } from './utils';

export async function getAllApi(resource, data) {
  return get(`/${resource}`, data);
}

export async function getOneApi(resource, id, data) {
  return get(`/${resource}/${id}`, data);
}

export async function delApi(resource, id) {
  return put(`/${resource}/${id}`, { isActive: false });
}

export async function postApi(resource, data) {
  return post(`/${resource}`, data);
}

export async function putApi(resource, id, data) {
  return put(`/${resource}/${id}`, data);
}
