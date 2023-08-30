interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Organization Owner'],
  customerRoles: [],
  tenantRoles: ['Organization Owner', 'Data Analyst'],
  tenantName: 'Organization',
  applicationName: 'fghjk',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage organization registration',
    "Manage organization's data",
    'Invite and remove Data Analysts',
    'Manage excel sheets of electric Inverter',
  ],
};
