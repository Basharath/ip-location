/* eslint-disable camelcase */
import CircularProgress from '@mui/material/CircularProgress';
import Main from '../components/Main';
import { getGeoLocation } from '../src/httpService';

export default function search({ data }) {
  return !data ? <CircularProgress /> : <Main data={data} />;
}

export const getServerSideProps = async ({ query }) => {
  const { ip } = query;

  const data = await getGeoLocation(ip);

  return {
    props: { data },
  };
};
