export interface GeoJsonPropertiesI {
  name: string;
  'AREA DE FORNECIMENTO': string;
  BAIRRO: string;
  CIDADE: string;
  EMAIL: string;
  ENDEREÇO: string;
  ESTADO: string;
  'MÉDIA PROD. OVOS': string;
  'QTD ANIMAIS': string;
  'REDES SOCIAIS': string;
  TELEFONE: string;
  'TIPO DE OVO': string;
}

export interface GeoJsonPointI {
  properties: GeoJsonPropertiesI;
  geometry: number[];
}

export interface PointsI {
  organicPoints: GeoJsonPointI;
  cageFreePoints: GeoJsonPointI;
  redneckPoints: GeoJsonPointI;
  twoMethodsPoints: GeoJsonPointI;
  threeMethodsPoints: GeoJsonPointI;
}
