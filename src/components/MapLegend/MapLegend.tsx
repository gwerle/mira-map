import { Flex, Text } from '@chakra-ui/react';

export default function MapLegend(): JSX.Element {
  return (
    <Flex background="white" flexDirection="column">
      <Text fontWeight="bold" fontSize="15px" p="10px">
        Legenda
      </Text>
      <Flex alignItems="center" p="10px">
        <img
          src="assets/2SistemasProducao.png"
          alt="Livre Gaiola"
          width="20px"
        />
        <Text ml="5px">2 Sistemas Produção</Text>
      </Flex>

      <Flex alignItems="center" p="10px">
        <img
          src="assets/3SistemasProducao.png"
          alt="Livre Gaiola"
          width="20px"
        />
        <Text ml="5px">3 Sistemas Produção</Text>
      </Flex>

      <Flex alignItems="center" p="10px">
        <img src="assets/Caipira.png" alt="Livre Gaiola" width="20px" />
        <Text ml="5px">Caipira</Text>
      </Flex>

      <Flex alignItems="center" p="10px">
        <img src="assets/LivreGaiola.png" alt="Livre Gaiola" width="20px" />
        <Text ml="5px">Livre Gaiola</Text>
      </Flex>

      <Flex alignItems="center" p="10px">
        <img src="assets/Organico.png" alt="Livre Gaiola" width="20px" />
        <Text ml="5px">Orgânico</Text>
      </Flex>
    </Flex>
  );
}
