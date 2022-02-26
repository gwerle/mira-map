export type ProductionSystem =
  | 'CAIPIRA'
  | 'GAIOLA'
  | 'IN_NATURA'
  | 'LIVRE_GAIOLA'
  | 'ORGANICO'
  | 'NAO_INFORMADO'
  | '2_SISTEMAS_PRODUCAO'
  | '3_SISTEMAS_PRODUCAO';

export interface PointsI {
  id: number;
  farm_name: string;
  address: string;
  district: string;
  city: string;
  cep: number;
  phone_number: string;
  state: string;
  social_media: string;
  supply_area: string;
  production_system_enum: ProductionSystem;
  production_system: string;
  egg_type: string;
  avg_egg_production: string;
  animals_quantity: string;
  permission_to_send_info: boolean;
  email: string;
  more_information: string;
  st_x: number;
  st_y: number;
  lng: number;
  lat: number;
}

export interface FilterFormI {
  region: string;
  state: string;
  city: string;
  productionSystem: string;
  eggType: string;
}
