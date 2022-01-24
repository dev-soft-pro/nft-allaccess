import * as OPTIONS from 'services/options';

export const CIRCLE_API_KEY = 'QVBJX0tFWTphYjkzZGE2YmFjMWFkZDU1NWYzNWY4OWViYmE5OWVmYzo2M2U4MjA4M2M2YmM2ZTUzNjRmZmY4ZjRiNTBiMTFiMw'
const BASE_URL = 'https://api-sandbox.circle.com'

export const getPCIPublicKey = async () => {
  const url = BASE_URL + '/v1/encryption/public';
  const response = await fetch(url, OPTIONS.GET_AUTH(CIRCLE_API_KEY));
  const data = await response.json();
  return data;
}

export const createCard = async (payload) => {
  const url = BASE_URL + '/v1/cards';
  const response = await fetch(url, OPTIONS.POST_AUTH(payload, CIRCLE_API_KEY));
  const data = await response.json();
  if (response.status !== 200) {
    return data;
  } else {
    return data.data;
  }
}

export const createPayment = async (payload) => {
  console.log(payload);
  const url = BASE_URL + '/v1/payments';
  const response = await fetch(url, OPTIONS.POST_AUTH(payload, CIRCLE_API_KEY));
  const data = await response.json();
  return data;
}