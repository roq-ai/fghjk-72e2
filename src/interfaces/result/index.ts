import { AlgorithmInterface } from 'interfaces/algorithm';
import { ExcelDataInterface } from 'interfaces/excel-data';
import { GetQueryInterface } from 'interfaces';

export interface ResultInterface {
  id?: string;
  result_data: string;
  algorithm_id: string;
  excel_data_id: string;
  created_at?: any;
  updated_at?: any;

  algorithm?: AlgorithmInterface;
  excel_data?: ExcelDataInterface;
  _count?: {};
}

export interface ResultGetQueryInterface extends GetQueryInterface {
  id?: string;
  result_data?: string;
  algorithm_id?: string;
  excel_data_id?: string;
}
