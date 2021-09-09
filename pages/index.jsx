/* eslint-disable camelcase */
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Main from '../components/Main';
import { getGeoLocation, getClientIp } from '../src/httpService';

export default function Home({ geoData }) {
  const router = useRouter();

  useEffect(() => {
    const getIp = async () => {
      const data = await getClientIp();
      router.push(`?ip=${data?.ip}`);
    };
    getIp();
  }, [router.query.ip]);

  return <Main data={{ ...geoData, client: true }} />;
}

export const getServerSideProps = async ({ query }) => {
  const { ip } = query;

  const geoData = ip
    ? await getGeoLocation(ip)
    : { message: 'loading', ip: '' };

  return {
    props: { geoData },
  };
};
