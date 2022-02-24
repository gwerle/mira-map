import L, { LatLngTuple } from 'leaflet';
import { useState, useEffect } from 'react';
import { MapContainer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { RiSearchLine } from 'react-icons/ri';

import { Flex, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';

import MapProducerField from '../MapProducerField/MapProducerField';
import MapPopup from '../MapPopup/MapPopup';
import MapFilter from '../MapFilter/MapFilter';
import OrganicEggsIcon from '../../icons/OrganicEggs';
import CageFreeEggsIcon from '../../icons/CageFreeEggs';
import RedneckEggsIcon from '../../icons/RedneckEggs';
import ThreeMethodsIcon from '../../icons/ThreeMethods';
import TwoMethodsIcon from '../../icons/TwoMethods';
import { PointsI } from '../../@types';
import 'leaflet/dist/leaflet.css';
import 'leaflet-boundary-canvas';

type Props = {
  points: PointsI;
};

const mapStyle = { height: '100vh' };

export default function Map({ points }: Props): JSX.Element {
  const [map, setMap] = useState(null);
  const [showField, setShowField] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!map) return;

    const fetchGeoJSON = async (): Promise<void> => {
      const response = await fetch(
        'https://raw.githubusercontent.com/luizpedone/municipal-brazilian-geodata/master/minified/Brasil.min.json'
      );
      const geoJSON = await response.json();
      const tileLayer: any = L.TileLayer;
      const osm = tileLayer.boundaryCanvas(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          boundary: geoJSON,
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
        }
      );
      map.addLayer(osm);
      const ukLayer = L.geoJSON(geoJSON);
      map.fitBounds(ukLayer.getBounds());
    };

    fetchGeoJSON();
  }, [map]);

  const getIcon = (id: string): L.Icon<L.IconOptions> => {
    switch (id) {
      case 'cageFreePoints':
        return CageFreeEggsIcon;
      case 'organicPoints':
        return OrganicEggsIcon;
      case 'redneckPoints':
        return RedneckEggsIcon;
      case 'threeMethodsPoints':
        return ThreeMethodsIcon;
      case 'twoMethodsPoints':
        return TwoMethodsIcon;
      default:
        return TwoMethodsIcon;
    }
  };

  return (
    <>
      <MapContainer zoom={13} style={mapStyle} whenCreated={setMap}>
        <div className="leaflet-left leaflet-top">
          <div className="leaflet-control leaflet-control-zoom">
            <Flex mt="80px">
              <Tooltip label="Pesquisar produtor" fontSize="md">
                <IconButton
                  variant="outline"
                  background="white"
                  colorScheme="gray"
                  aria-label="Pesquisar produtor"
                  icon={<RiSearchLine />}
                  onClick={() => setShowField(!showField)}
                  borderRadius="0"
                />
              </Tooltip>
              {showField ? <MapProducerField points={points} /> : null}
            </Flex>
          </div>
        </div>
        <MarkerClusterGroup>
          {Object.keys(points).map(key => {
            return points[key].features.map(point => {
              const pointPosition = [
                point?.geometry?.coordinates[1],
                point?.geometry?.coordinates[0],
              ];

              return (
                <Marker
                  icon={getIcon(key)}
                  position={pointPosition as LatLngTuple}
                  key={point.properties.id}
                >
                  <MapPopup point={point} />
                </Marker>
              );
            });
          })}
        </MarkerClusterGroup>
        <MapFilter points={points} isOpen={isOpen} onClose={onClose} />
      </MapContainer>
    </>
  );
}
