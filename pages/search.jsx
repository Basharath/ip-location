/* eslint-disable camelcase */
import Main from '../components/Main';
import { getGeoLocation } from '../src/httpService';

export default function search({ data }) {
  return <Main data={data} />;
}

export const getServerSideProps = async ({ query }) => {
  const { ip } = query;

  const data = await getGeoLocation(ip);

  if (!data)
    return {
      redirect: '/',
      permanent: false,
    };

  return {
    props: { data },
  };
};
