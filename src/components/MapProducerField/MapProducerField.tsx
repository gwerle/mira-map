import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useMap } from 'react-leaflet';

import { PointsI } from '../../@types';

type Props = {
  points: PointsI[];
};

export default function MapProducerField({ points }: Props): JSX.Element {
  const map = useMap();

  const handleChangeProducerSelection = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedPoint = points.find(item => {
      return item.id === Number(event.target.value);
    });

    const location: L.LatLngExpression = [selectedPoint.lat, selectedPoint.lng];

    map.flyTo(location, 15);
  };

  return (
    <Select
      background="white"
      borderRadius="0"
      placeholder="Pesquisar produtor"
      onChange={handleChangeProducerSelection}
      size="sm"
    >
      {points.map(point => {
        return <option value={point.id}>{point.farm_name}</option>;
      })}
    </Select>
  );
}
