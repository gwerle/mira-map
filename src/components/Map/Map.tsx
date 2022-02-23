import L, { LatLngTuple } from 'leaflet';
import { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-boundary-canvas';
import { Button, useDisclosure } from '@chakra-ui/react';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import MapFilter from '../MapFilter/MapFilter';
import OrganicEggsIcon from '../../icons/OrganicEggs';
import CageFreeEggsIcon from '../../icons/CageFreeEggs';
import RedneckEggsIcon from '../../icons/RedneckEggs';
import ThreeMethodsIcon from '../../icons/ThreeMethods';
import TwoMethodsIcon from '../../icons/TwoMethods';

const mapStyle = { height: '100vh' };

export default function Map({ points }: any): JSX.Element {
  const [map, setMap] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!map) return;

    const fetchGeoJSON = async (): Promise<void> => {
      const response = await fetch(
        'https://raw.githubusercontent.com/luizpedone/municipal-brazilian-geodata/master/minified/Brasil.min.json'
      );
      const geoJSON = await response.json();
      const osm = L.TileLayer.boundaryCanvas(
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

  const getIcon = (id: string) => {
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
        <div className="leaflet-right leaflet-top">
          <div className="leaflet-control leaflet-bar leaflet-control-zoom">
            <Button onClick={onOpen}>Filtrar</Button>
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
                  <Popup>{point?.properties?.name}</Popup>
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
