import L, { LatLngTuple } from 'leaflet';
import { useState, useEffect } from 'react';
import { MapContainer, Marker } from 'react-leaflet';
import { RiSearchLine } from 'react-icons/ri';
import { BsFilter } from 'react-icons/bs';

import { Flex, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';

import { AiFillFilePdf } from 'react-icons/ai';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import MapProducerField from '../MapProducerField/MapProducerField';
import MapPopup from '../MapPopup/MapPopup';
import MapFilter from '../MapFilter/MapFilter';
import MapLegend from '../MapLegend/MapLegend';
import OrganicEggsIcon from '../../icons/OrganicEggs';
import CageFreeEggsIcon from '../../icons/CageFreeEggs';
import RedneckEggsIcon from '../../icons/RedneckEggs';
import ThreeMethodsIcon from '../../icons/ThreeMethods';
import TwoMethodsIcon from '../../icons/TwoMethods';
import { PointsI, ProductionSystem } from '../../@types';
import 'leaflet/dist/leaflet.css';
import 'leaflet-boundary-canvas';
import { getProducers } from '../../services/PointsService';
import generatePdf from '../../utils/generatePdf';
import InTransitionIcon from '../../icons/InTransition';

type Props = {
  points: PointsI[];
};

const mapStyle = { height: '100vh', backgroundColor: '#efefef' };

export default function Map({ points }: Props): JSX.Element {
  const [map, setMap] = useState(null);
  const [showField, setShowField] = useState(false);
  const [filteredData, setFilteredData] = useState(points);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!map || !filteredData.length) return;

    map.fitBounds(filteredData);
  }, [filteredData]);

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
      const brLayer = L.geoJSON(geoJSON);
      map.fitBounds(brLayer.getBounds());
    };

    fetchGeoJSON();
  }, [map]);

  const getIcon = (id: ProductionSystem): L.Icon<L.IconOptions> => {
    switch (id) {
      case 'LIVRE_GAIOLA':
        return CageFreeEggsIcon;
      case 'ORGANICO':
        return OrganicEggsIcon;
      case 'CAIPIRA':
        return RedneckEggsIcon;
      case '3_SISTEMAS_PRODUCAO':
        return ThreeMethodsIcon;
      case '2_SISTEMAS_PRODUCAO':
        return TwoMethodsIcon;
      case 'EM_TRANSICAO':
        return InTransitionIcon;
      default:
        return TwoMethodsIcon;
    }
  };

  const handleFilterData = async (): Promise<void> => {
    const response = await getProducers();

    setFilteredData(response.data);
  };

  const printDataPdf = (): void => {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinition = generatePdf(filteredData);
    pdfMake.createPdf(docDefinition as any).download(`Dados Mira.pdf`);
  };

  return (
    <>
      <MapContainer zoom={13} style={mapStyle} whenCreated={setMap}>
        <div className="leaflet-left leaflet-top">
          <div className="leaflet-control">
            <Flex mt="80px">
              <Tooltip label="Pesquisar produtor" fontSize="md">
                <IconButton
                  variant="outline"
                  background="white"
                  colorScheme="gray"
                  aria-label="Pesquisar produtor"
                  icon={<RiSearchLine fontSize="15" />}
                  onClick={() => setShowField(!showField)}
                  borderRadius="0"
                  size="sm"
                />
              </Tooltip>
              {showField ? (
                <MapProducerField
                  points={filteredData}
                  onClose={() => setShowField(false)}
                />
              ) : null}
            </Flex>
          </div>
        </div>
        <div className="leaflet-left leaflet-bottom">
          <MapLegend />
        </div>
        <div className="leaflet-right leaflet-top">
          <div className="leaflet-control">
            <Tooltip label="Filtrar dados" fontSize="md">
              <IconButton
                variant="outline"
                background="white"
                colorScheme="gray"
                aria-label="Pesquisar produtor"
                icon={<BsFilter fontSize="25" />}
                onClick={onOpen}
                size="lg"
              />
            </Tooltip>
          </div>
          <div className="leaflet-control">
            <Tooltip label="Gerar PDF dos dados filtrados" fontSize="md">
              <IconButton
                variant="outline"
                background="white"
                colorScheme="gray"
                aria-label="Gerar PDF"
                icon={<AiFillFilePdf fontSize="25" />}
                size="lg"
                onClick={() => printDataPdf()}
              />
            </Tooltip>
          </div>
        </div>
        {filteredData.map(point => {
          return (
            <Marker
              icon={getIcon(point.production_system_enum)}
              position={[point.lat, point.lng] as LatLngTuple}
              key={point.id}
            >
              <MapPopup point={point} />
            </Marker>
          );
        })}
        <MapFilter
          isOpen={isOpen}
          onClose={onClose}
          handleFilterData={handleFilterData}
        />
      </MapContainer>
    </>
  );
}
