/* eslint-disable camelcase */
// import useSWR from 'swr';
import CircularProgress from '@mui/material/CircularProgress';
import Main from '../components/Main';
import { getGeoLocation } from '../src/httpService';

export default function Home({ data }) {
  // const { data, error } = useSWR('clientGeo', getClientGeo);

  // if (error) return <div>failed to load</div>;

  console.log('data', data);
  const {
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
    client: 'yes',
  };

  return !data ? <CircularProgress /> : <Main data={ipData} />;
}

export const getServerSideProps = async () => {
  const data = await getGeoLocation('');

  return {
    props: { data },
  };
};

// <Box
//   sx={{
//     mt: 9,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   }}
// >
//   <Typography sx={{ mb: 4 }} variant='h4' component='h1' color='primary'>
//     IP location finder
//   </Typography>

//   {!data ? (
//     <CircularProgress />
//   ) : (
//     <>
//       <Box
//         sx={{
//           border: !isMobile && '1px solid #c4c4c4',
//           p: isMobile ? 2 : 8,
//           py: 4,
//           borderRadius: 2,
//           textAlign: 'center',
//           mb: 2,
//         }}
//       >
//         <Paper
//           component='form'
//           sx={{
//             p: '2px 4px',
//             display: 'flex',
//             alignItems: 'center',
//             width: isMobile ? 300 : 400,
//             mb: 3,
//           }}
//           elevation={3}
//           onSubmit={handleSubmit}
//         >
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder='Enter an IP address'
//             inputProps={{
//               'aria-label': 'Enter an IP address',
//               maxLength: 15,
//             }}
//             onChange={handleChange}
//           />
//           <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
//             <SearchIcon />
//           </IconButton>
//         </Paper>
//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <Typography mr={2}>Your IP: {data?.ip}</Typography>
//           <Image
//             src={data?.country_flag}
//             // src='https://ipgeolocation.io/static/flags/in_64.png'
//             alt={data?.country}
//             width={60}
//             height={30}
//           />
//         </Box>
//       </Box>
//       <Box>
//         <Typography>IP address info</Typography>
//         <List>
//           <ListItem>
//             {/* <ListItemIcon>
//               <FolderIcon />
//             </ListItemIcon> */}
//             <ListItemText primary='Single-line item' />
//           </ListItem>
//         </List>
//       </Box>
//     </>
//   )}
// </Box>
