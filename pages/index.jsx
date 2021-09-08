/* eslint-disable camelcase */
import useSWR from 'swr';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Main from '../components/Main';
import { getGeoLocation, getClientIp } from '../src/httpService';

export default function Home({ geoData }) {
  const router = useRouter();
  const { data } = useSWR('clientIp', getClientIp);

  useEffect(() => {
    if (data) router.push(`?ip=${data?.ip}`);
  }, [data]);

  return <Main data={{ ...geoData, client: true }} />;
}

export const getServerSideProps = async ({ query }) => {
  const { ip } = query;

  const geoData = await getGeoLocation(ip || '');

  return {
    props: { geoData },
  };
};
