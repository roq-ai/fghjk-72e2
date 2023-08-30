import axios from 'axios';
import queryString from 'query-string';
import { AlgorithmInterface, AlgorithmGetQueryInterface } from 'interfaces/algorithm';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAlgorithms = async (
  query?: AlgorithmGetQueryInterface,
): Promise<PaginatedInterface<AlgorithmInterface>> => {
  const response = await axios.get('/api/algorithms', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAlgorithm = async (algorithm: AlgorithmInterface) => {
  const response = await axios.post('/api/algorithms', algorithm);
  return response.data;
};

export const updateAlgorithmById = async (id: string, algorithm: AlgorithmInterface) => {
  const response = await axios.put(`/api/algorithms/${id}`, algorithm);
  return response.data;
};

export const getAlgorithmById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/algorithms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAlgorithmById = async (id: string) => {
  const response = await axios.delete(`/api/algorithms/${id}`);
  return response.data;
};
