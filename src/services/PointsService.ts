import api from './api';

export function getProducerPoints(productionSystem: string): Promise<any> {
  return api.get(`/producer?productionSystem=${productionSystem}`);
}
