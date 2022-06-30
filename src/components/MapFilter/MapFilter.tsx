import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Select,
  Text,
} from '@chakra-ui/react';

import {
  BRAZIL_REGIONS,
  BRAZIL_STATES,
  PRODUCTION_SYSTEMS,
} from '../../constants';
import {
  getAllEggTypes,
  getProducerCities,
} from '../../services/PointsService';
import { FilterFormI } from '../../@types';
import { formatParams } from '../../utils/formatSearchParams';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleFilterData: (params: URLSearchParams) => void;
};

const MapFilter = ({
  isOpen,
  onClose,
  handleFilterData,
}: Props): JSX.Element => {
  const [states, setStates] = useState(BRAZIL_STATES);
  const [cities, setCities] = useState([]);
  const [citiesApiLoading, setCitiesApiLoading] = useState(false);
  const [productionSystems, setProductionSystems] = useState([]);
  const [eggTypes, setEggTypes] = useState([]);

  const { register, watch, setValue, handleSubmit, reset } =
    useForm<FilterFormI>({
      mode: 'onChange',
    });
  const regionValue = watch('region');
  const stateValue = watch('state');

  const getCitiesRest = async (): Promise<void> => {
    if (stateValue) {
      setCitiesApiLoading(true);
      const response = await getProducerCities(stateValue);

      setCities(response.data);
      setCitiesApiLoading(false);
    }
  };

  const getEggTypesRest = async (): Promise<void> => {
    const response = await getAllEggTypes();

    setEggTypes(response.data);
  };

  useEffect(() => {
    setValue('state', null);
    setValue('city', null);

    if (regionValue) {
      const statesOfRegion = BRAZIL_STATES.filter(
        state => state.region === regionValue
      );

      setStates(statesOfRegion);
    }
  }, [regionValue, setValue]);

  useEffect(() => {
    setValue('city', null);

    getCitiesRest();
  }, [stateValue, setValue]);

  useEffect(() => {
    setProductionSystems(PRODUCTION_SYSTEMS);
    getEggTypesRest();
  }, []);

  const onFormSubmit = (data: FilterFormI): void => {
    const { region, state, city, eggType, productionSystem } = data;
    let statesFiltered = [state];
    if (region && !state) {
      const statesOfRegion = BRAZIL_STATES.filter(s => s.region === region);
      const regionsIds = statesOfRegion.map(r => r.id);

      statesFiltered = regionsIds;
    }

    const filterData = {
      states: statesFiltered,
      city,
      eggType,
      productionSystem,
    };

    const paramsFormatted = formatParams(filterData);

    handleFilterData(paramsFormatted as URLSearchParams);
    onClose();
  };

  const handleClickCloseIcon = (): void => {
    onClose();
    reset();
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={handleClickCloseIcon}
      size="sm"
    >
      <DrawerOverlay />
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="16px">Filtrar</DrawerHeader>

          <DrawerBody style={{ overflow: 'hidden' }}>
            <Text fontSize="14px" fontWeight={500}>
              Filtro por Localização
            </Text>
            <Text mb="10px" color="gray" fontSize="x-small">
              O filtro por localização leva em conta apenas as cidades que
              possuem produtores cadastrados na nossa plataforma.
            </Text>
            <Select
              mb="20px"
              ml="5px"
              placeholder="Região do País"
              {...register('region')}
            >
              {BRAZIL_REGIONS.map(region => {
                return <option value={region}>{region}</option>;
              })}
            </Select>
            <Select
              m="20px 5px 0 5px"
              placeholder="Estado"
              {...register('state')}
              disabled={!regionValue}
            >
              {states.map(state => {
                return <option value={state.id}>{state.name}</option>;
              })}
            </Select>
            {!regionValue ? (
              <Text ml="5px" fontSize="11px" color="grey" fontWeight={500}>
                * Selecione uma Região
              </Text>
            ) : null}
            <Select
              m="20px 5px 0 5px"
              placeholder="Cidade"
              {...register('city')}
              disabled={!watch('state') || citiesApiLoading}
            >
              {cities.map(city => {
                return <option value={city}>{city}</option>;
              })}
            </Select>
            {!watch('state') ? (
              <Text ml="5px" fontSize="11px" color="grey" fontWeight={500}>
                * Selecione um Estado
              </Text>
            ) : null}

            <Text fontSize="14px" fontWeight={500} mb="10px" mt="30px">
              Outros Filtros
            </Text>

            <Select
              mb="20px"
              ml="5px"
              placeholder="Sistema de Produção"
              {...register('productionSystem')}
            >
              {productionSystems.map(system => {
                return <option value={system}>{system}</option>;
              })}
            </Select>
            <Select
              m="20px 5px 0 5px"
              placeholder="Tipo de ovo"
              {...register('eggType')}
            >
              {eggTypes.map(eggType => {
                return <option value={eggType}>{eggType}</option>;
              })}
            </Select>
            <Button
              colorScheme="blue"
              variant="link"
              onClick={() => reset()}
              ml="5px"
              mt="20px"
              size="sm"
            >
              Limpar Filtros
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button width="100%" colorScheme="green" type="submit">
              Filtrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default MapFilter;
