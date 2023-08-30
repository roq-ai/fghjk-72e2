import axios from 'axios';
import queryString from 'query-string';
import { ExcelDataInterface, ExcelDataGetQueryInterface } from 'interfaces/excel-data';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getExcelData = async (
  query?: ExcelDataGetQueryInterface,
): Promise<PaginatedInterface<ExcelDataInterface>> => {
  const response = await axios.get('/api/excel-data', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createExcelData = async (excelData: ExcelDataInterface) => {
  const response = await axios.post('/api/excel-data', excelData);
  return response.data;
};

export const updateExcelDataById = async (id: string, excelData: ExcelDataInterface) => {
  const response = await axios.put(`/api/excel-data/${id}`, excelData);
  return response.data;
};

export const getExcelDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/excel-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteExcelDataById = async (id: string) => {
  const response = await axios.delete(`/api/excel-data/${id}`);
  return response.data;
};
