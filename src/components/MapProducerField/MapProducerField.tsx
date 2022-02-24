import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useMap } from 'react-leaflet';

import { PointsI } from '../../@types';

type Props = {
  points: PointsI;
};

export default function MapProducerField({ points }: Props): JSX.Element {
  const map = useMap();

  const handleChangeProducerSelection = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const allPoints = [];
    Object.keys(points).forEach(key => {
      points[key].features.forEach(point => {
        allPoints.push(point);
      });
    });

    const selectedPoint = allPoints.find(item => {
      return item.id === Number(event.target.value);
    });

    const location: L.LatLngExpression = [
      selectedPoint.geometry.coordinates[1],
      selectedPoint.geometry.coordinates[0],
    ];

    map.flyTo(location, 15);
  };

  return (
    <Select
      background="white"
      borderRadius="0"
      placeholder="Pesquisar produtor"
      onChange={handleChangeProducerSelection}
    >
      {Object.keys(points).map(key => {
        return points[key].features.map(point => {
          return <option value={point.id}>{point?.properties?.name}</option>;
        });
      })}
    </Select>
  );
}
