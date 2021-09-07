/* eslint-disable camelcase */
import CircularProgress from '@mui/material/CircularProgress';
import Main from '../components/Main';
import { getGeoLocation } from '../src/httpService';

export default function search({ data }) {
  const {
    ip,
    country_flag,
    isp,
    city,
    state_prv: state,
    country_name: country,
    country_capital: capital,
    country_code2: country_code,
    currency: { name: currency, symbol: currency_symbol },
    latitute,
    longitude,
    time_zone: { name: timezone, offset: timezone_gmt },
  } = data || {};

  const ipData = {
    ip,
    country_flag,
    isp,
    city,
    state,
    country,
    capital,
    country_code,
    currency,
    currency_symbol,
    latitute,
    longitude,
    timezone,
    timezone_gmt,
  };

  return !data ? <CircularProgress /> : <Main data={ipData} />;
}

export const getServerSideProps = async ({ query }) => {
  const { ip } = query;

  const data = await getGeoLocation(ip);

  return {
    props: { data },
  };
};
