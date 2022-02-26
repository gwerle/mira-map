export const BRAZIL_STATES = [
  {
    id: 'AC',
    name: 'Acre',
    region: 'Norte',
  },
  {
    id: 'AL',
    name: 'Alagoas',
    region: 'Nordeste',
  },
  {
    id: 'AP',
    name: 'Amapá',
    region: 'Norte',
  },
  {
    id: 'AM',
    name: 'Amazonas',
    region: 'Norte',
  },
  {
    id: 'BA',
    name: 'Bahia',
    region: 'Nordeste',
  },
  {
    id: 'CE',
    name: 'Ceará',
    region: 'Nordeste',
  },
  {
    id: 'ES',
    name: 'Espírito Santo',
    region: 'Sudeste',
  },
  {
    id: 'GO',
    name: 'Goiás',
    region: 'Centro-Oeste',
  },
  {
    id: 'MA',
    name: 'Maranhão',
    region: 'Nordeste',
  },
  {
    id: 'MT',
    name: 'Mato Grosso',
    region: 'Centro-Oeste',
  },
  {
    id: 'MS',
    name: 'Mato Grosso do Sul',
    region: 'Centro-Oeste',
  },
  {
    id: 'MG',
    name: 'Minas Gerais',
    region: 'Sudeste',
  },
  {
    id: 'PA',
    name: 'Pará',
    region: 'Norte',
  },
  {
    id: 'PB',
    name: 'Paraíba',
    region: 'Nordeste',
  },
  {
    id: 'PR',
    name: 'Paraná',
    region: 'Sul',
  },
  {
    id: 'PE',
    name: 'Pernambuco',
    region: 'Nordeste',
  },
  {
    id: 'PI',
    name: 'Piauí',
    region: 'Nordeste',
  },
  {
    id: 'RJ',
    name: 'Rio de Janeiro',
    region: 'Sudeste',
  },
  {
    id: 'RN',
    name: 'Rio Grande do Norte',
    region: 'Nordeste',
  },
  {
    id: 'RS',
    name: 'Rio Grande do Sul',
    region: 'Sul',
  },
  {
    id: 'RO',
    name: 'Rondônia',
    region: 'Norte',
  },
  {
    id: 'RR',
    name: 'Roraima',
    region: 'Norte',
  },
  {
    id: 'SC',
    name: 'Santa Catarina',
    region: 'Sul',
  },
  {
    id: 'SP',
    name: 'São Paulo',
    region: 'Sudeste',
  },
  {
    id: 'SE',
    name: 'Sergipe',
    region: 'Nordeste',
  },
  {
    id: 'TO',
    name: 'Tocantins',
    region: 'Norte',
  },
  {
    id: 'DF',
    name: 'Distrito Federal',
    region: 'Centro-Oeste',
  },
];

export const BRAZIL_REGIONS = BRAZIL_STATES.map(state => state.region).filter(
  (region, pos, self) => self.indexOf(region) === pos
);

export const PRODUCTION_SYSTEMS = ['Caipira', 'Livre de Gaiola', 'Orgânico'];
