import { useMemo } from 'react';
import dynamic from 'next/dynamic';

import { CircularProgress, Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getProducers } from '../services/PointsService';
import { PointsI } from '../@types';

type Props = {
  allProducersPoints: PointsI[];
};

export default function SignIn({ allProducersPoints }: Props): JSX.Element {
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

  return <Map points={allProducersPoints} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const allProducersResponse = await getProducers();

  return {
    props: {
      allProducersPoints: allProducersResponse.data,
    },
  };
};
