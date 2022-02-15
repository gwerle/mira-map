import { useMemo } from 'react';
import dynamic from 'next/dynamic';

export default function SignIn(): JSX.Element {
  const Map = useMemo(
    () =>
      dynamic(
        () => import('../components/Map/Map'), // replace '@components/map' with your component's location
        {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    []
  );

  return <Map />;
}
