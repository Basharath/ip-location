/* eslint-disable camelcase */
// import useSWR from 'swr';
import Main from '../components/Main';
import { getGeoLocation } from '../src/httpService';

export default function Home({ data }) {
  return <Main data={{ ...data, client: true }} />;
}

export const getServerSideProps = async ({ query }) => {
  const { ip } = query;
  const data = await getGeoLocation(ip || '');

  return {
    props: { data },
  };
};
