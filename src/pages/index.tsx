import { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { CircularProgress, Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getProducerPoints } from '../services/PointsService';
import { PointsI } from '../@types';

type Props = {
  points: PointsI;
};

export default function SignIn({ points }: Props): JSX.Element {
  const Map = useMemo(
    () =>
      dynamic(() => import('../components/Map/Map'), {
        loading: () => (
          <Flex
            height="100vh"
            width="100vw"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress size={100} isIndeterminate color="green.300" />
          </Flex>
        ),
        ssr: false,
      }),
    []
  );

  return <Map points={points} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const organicResponse = await getProducerPoints('ORGANICO');
  const cageFreeResponse = await getProducerPoints('LIVRE_GAIOLA');
  const redneckResponse = await getProducerPoints('CAIPIRA');
  const twoMethodsResponse = await getProducerPoints('2_SISTEMAS_PRODUCAO');
  const threeMethodsResponse = await getProducerPoints('3_SISTEMAS_PRODUCAO');

  return {
    props: {
      points: {
        organicPoints: organicResponse.data,
        cageFreePoints: cageFreeResponse.data,
        redneckPoints: redneckResponse.data,
        twoMethodsPoints: twoMethodsResponse.data,
        threeMethodsPoints: threeMethodsResponse.data,
      },
    },
  };
};
