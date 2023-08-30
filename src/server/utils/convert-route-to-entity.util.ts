const mapping: Record<string, string> = {
  algorithms: 'algorithm',
  'excel-data': 'excel_data',
  invitations: 'invitation',
  organizations: 'organization',
  results: 'result',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
