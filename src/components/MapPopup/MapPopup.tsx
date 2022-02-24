import { Popup } from 'react-leaflet';
import { Flex, Text, Link } from '@chakra-ui/react';

import { GeoJsonPointI } from '../../@types';

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
  point: GeoJsonPointI;
};

export default function MapPopup({ point }: MapPopupProps): JSX.Element {
  return (
    <Popup maxHeight={450} minWidth={250}>
      <PopupItem label="Produtor" value={point?.properties?.name} />
      <PopupItem
        label="Área de Fornecimento"
        value={point?.properties['AREA DE FORNECIMENTO']}
      />
      <PopupItem label="Bairro" value={point?.properties.BAIRRO} />
      <PopupItem label="Cidade" value={point?.properties.CIDADE} />
      <PopupItem label="Email" value={point?.properties.EMAIL} />
      <PopupItem label="Endereço" value={point?.properties['ENDEREÇO']} />
      <PopupItem label="Estado" value={point?.properties.ESTADO} />
      <PopupItem
        label="Média de Produção de Ovos"
        value={point?.properties['MÉDIA PROD. OVOS']}
      />
      <PopupItem
        label="Quantidade de Animais"
        value={point?.properties['QTD ANIMAIS']}
      />

      <Flex flexDirection="column" mt="10px">
        <Text m="0px !important" fontWeight="bold">
          Redes Sociais
        </Text>
        <Link
          href={point?.properties['REDES SOCIAIS']}
          target="_blank"
          m="0px !important"
        >
          {point?.properties['REDES SOCIAIS']}
        </Link>
      </Flex>

      <PopupItem label="Telefone" value={point?.properties.TELEFONE} />
      <PopupItem label="Tipo de Ovo" value={point?.properties['TIPO DE OVO']} />
    </Popup>
  );
}
