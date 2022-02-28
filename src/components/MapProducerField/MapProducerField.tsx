import { Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import { useMap } from 'react-leaflet';
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

import { PointsI } from '../../@types';

type Props = {
  points: PointsI[];
  onClose: () => void;
};

export default function MapProducerField({
  points,
  onClose,
}: Props): JSX.Element {
  const map = useMap();

  const handleChangeProducerSelection = (event: any): void => {
    const idSelected = Number(event.item.value);
    const selectedPoint = points.find(item => {
      return item.id === idSelected;
    });

    const location: L.LatLngExpression = [selectedPoint.lat, selectedPoint.lng];

    map.flyTo(location, 15);
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose} size="sm">
      <ModalOverlay />
      <ModalContent>
        <AutoComplete
          onSelectOption={handleChangeProducerSelection}
          emptyState={false}
        >
          <AutoCompleteInput
            variant="outline"
            placeholder="Digite o nome do produtor..."
            background="white"
            width="100%"
          />
          <AutoCompleteList>
            <AutoCompleteGroup
              title="Pesquisar produtor"
              showDivider
              background="white"
            >
              {points.map(point => (
                <AutoCompleteItem
                  key={point.id}
                  value={String(point.id)}
                  label={String(point.farm_name)}
                  textTransform="capitalize"
                  align="center"
                >
                  <Text ml="4">{point.farm_name}</Text>
                </AutoCompleteItem>
              ))}
            </AutoCompleteGroup>
          </AutoCompleteList>
        </AutoComplete>
      </ModalContent>
    </Modal>
  );
}
