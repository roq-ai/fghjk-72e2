import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface InvitationInterface {
  id?: string;
  email: string;
  organization_id: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface InvitationGetQueryInterface extends GetQueryInterface {
  id?: string;
  email?: string;
  organization_id?: string;
  status?: string;
}
