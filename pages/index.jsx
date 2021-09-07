import useSWR from 'swr';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
// import FolderIcon from '@mui/icons-material/Folder';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getClientGeo } from '../src/httpService';

export default function Home() {
  const { data, error } = useSWR('clientGeo', getClientGeo);
  const isMobile = useMediaQuery('(max-width: 540px)');

  if (error) return <div>failed to load</div>;
  return (
    <Box
      sx={{
        mt: 9,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ mb: 4 }} variant='h4' component='h1' color='primary'>
        IP location finder
      </Typography>

      {!data ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            sx={{
              border: !isMobile && '1px solid #c4c4c4',
              p: isMobile ? 2 : 8,
              py: 4,
              borderRadius: 2,
              textAlign: 'center',
              mb: 2,
            }}
          >
            <Paper
              component='form'
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: isMobile ? 300 : 400,
                mb: 3,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Enter an IP address'
                inputProps={{ 'aria-label': 'Enter an IP address' }}
              />
              <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
                <SearchIcon />
              </IconButton>
            </Paper>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography mr={2}>Your IP: {data?.ip}</Typography>
              <Image
                src={data?.country_flag}
                // src='https://ipgeolocation.io/static/flags/in_64.png'
                alt={data?.country}
                width={60}
                height={30}
              />
            </Box>
          </Box>
          <Box>
            <Typography>IP address info</Typography>
            <List>
              <ListItem>
                {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
                <ListItemText primary='Single-line item' />
              </ListItem>
            </List>
          </Box>
        </>
      )}
    </Box>
  );
}

// export const getServerSideProps = async () => {
//   const ip = await getIp();

//   const data = await getGeoLocation(ip);

//   return {
//     props: { data },
//   };
// };
