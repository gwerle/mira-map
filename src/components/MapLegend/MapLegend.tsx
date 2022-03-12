import { Flex, Text } from '@chakra-ui/react';

export default function MapLegend(): JSX.Element {
  return (
    <Flex background="white" flexDirection="column">
      <Text fontWeight="bold" fontSize="13px" p="5px">
        Legenda
      </Text>
      <Flex alignItems="center" p="5px">
        <img
          src="assets/2SistemasProducao.png"
          alt="Livre Gaiola"
          width="20px"
        />
        <Text ml="5px" fontSize="12px">
          2 Sistemas Produção
        </Text>
      </Flex>

      <Flex alignItems="center" p="5px">
        <img
          src="assets/3SistemasProducao.png"
          alt="Livre Gaiola"
          width="20px"
        />
        <Text fontSize="12px" ml="5px">
          3 Sistemas Produção
        </Text>
      </Flex>

      <Flex alignItems="center" p="5px">
        <img src="assets/EmTransicao.png" alt="Em Transição" width="20px" />
        <Text fontSize="12px" ml="5px">
          Em Transição
        </Text>
      </Flex>

      <Flex alignItems="center" p="5px">
        <img src="assets/Caipira.png" alt="Livre Gaiola" width="20px" />
        <Text fontSize="12px" ml="5px">
          Caipira
        </Text>
      </Flex>

      <Flex alignItems="center" p="5px">
        <img src="assets/LivreGaiola.png" alt="Livre Gaiola" width="20px" />
        <Text fontSize="12px" ml="5px">
          Livre Gaiola
        </Text>
      </Flex>

      <Flex alignItems="center" p="5px">
        <img src="assets/Organico.png" alt="Livre Gaiola" width="20px" />
        <Text fontSize="12px" ml="5px">
          Orgânico
        </Text>
      </Flex>
    </Flex>
  );
}
