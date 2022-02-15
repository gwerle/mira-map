import L from 'leaflet';
import { useState, useEffect } from 'react';
import { MapContainer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-boundary-canvas';
import { Button, useDisclosure } from '@chakra-ui/react';
import MapFilter from '../MapFilter/MapFilter';

const mapStyle = { height: '100vh' };

export default function Map(): JSX.Element {
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

  return (
    <>
      <MapContainer zoom={13} style={mapStyle} whenCreated={setMap} />

      <div className="leaflet-right leaflet-top">
        <div className="leaflet-control leaflet-bar leaflet-control-zoom">
          <Button onClick={onOpen}>Open Modal</Button>
        </div>
      </div>

      <MapFilter isOpen={isOpen} onClose={onClose} />
    </>
  );
}
