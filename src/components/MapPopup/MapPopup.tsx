import { Popup } from 'react-leaflet';
import { Flex, Text, Link } from '@chakra-ui/react';
import { PointsI } from '../../@types';

type PopupItemProps = {
  label: string;
  value: string;
};

const PopupItem = ({ label, value }: PopupItemProps): JSX.Element => {
  return (
    <Flex mt="5px" flexDirection="column">
      <Text m="0px !important" fontWeight="bold">
        {label}
      </Text>
      <Text m="0px !important">{value}</Text>
    </Flex>
  );
};

type MapPopupProps = {
  point: PointsI;
};

export default function MapPopup({ point }: MapPopupProps): JSX.Element {
  return (
    <Popup maxHeight={450} minWidth={250}>
      <PopupItem label="Produtor" value={point.farm_name} />
      <PopupItem label="Métodos Produção" value={point.production_system} />
      <PopupItem label="Área de Fornecimento" value={point.supply_area} />
      <PopupItem label="Bairro" value={point.district} />
      <PopupItem label="Cidade" value={point.city} />
      <PopupItem label="Email" value={point.email} />
      <PopupItem label="Endereço" value={point.address} />
      <PopupItem label="Estado" value={point.state} />
      <PopupItem
        label="Média de Produção de Ovos"
        value={point.avg_egg_production}
      />
      <PopupItem label="Quantidade de Animais" value={point.animals_quantity} />

      <Flex flexDirection="column" mt="10px">
        <Text m="0px !important" fontWeight="bold">
          Redes Sociais
        </Text>
        <Link href={point.social_media} target="_blank" m="0px !important">
          {point.social_media}
        </Link>
      </Flex>

      <PopupItem label="Telefone" value={point.phone_number} />
      <PopupItem label="Tipo de Ovo" value={point.egg_type} />
    </Popup>
  );
}
