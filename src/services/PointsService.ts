import { AxiosResponse } from 'axios';
import { PointsI } from '../@types';
import api from './api';

export function getProducers(params): Promise<AxiosResponse<PointsI[]>> {
  return api.get('/producer', {
    params,
  });
}

export function getProducerCities(
  state: string
): Promise<AxiosResponse<string[]>> {
  const params = { state };
  return api.get('/producer/cities', {
    params,
  });
}

export function getAllEggTypes(): Promise<AxiosResponse<string[]>> {
  return api.get('/producer/egg-types');
}
