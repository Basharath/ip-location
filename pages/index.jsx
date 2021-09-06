import { Typography, Box } from '@mui/material';
import { getGeoLocation, getIp } from '../src/httpService';

export default function Home({ data }) {
  return (
    <Box mt={5} textAlign='center'>
      <Typography variant='h4' component='h1' color='primary'>
        Welcome to IP location finder
      </Typography>
      <Box>Your IP is: {data.ip}</Box>
    </Box>
  );
}

export const getServerSideProps = async () => {
  const ip = await getIp();

  const data = await getGeoLocation(ip);

  return {
    props: { data },
  };
};
