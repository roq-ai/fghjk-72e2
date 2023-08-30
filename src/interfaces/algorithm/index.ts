import { ResultInterface } from 'interfaces/result';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AlgorithmInterface {
  id?: string;
  name: string;
  description?: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  result?: ResultInterface[];
  user?: UserInterface;
  _count?: {
    result?: number;
  };
}

export interface AlgorithmGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  user_id?: string;
}
