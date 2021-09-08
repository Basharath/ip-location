/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
import Layout from './Layout';

export default function Main({ data }) {
  const router = useRouter();
  const q = router.pathname !== '/' && router.query.ip;
  const [search, setSearch] = useState(q || '');
  const [isValidIp, setIsValidIp] = useState(true);
  const isMobile = useMediaQuery('(max-width: 540px)');

  useEffect(() => {
    if (q) setSearch(q);
  }, [q]);

  const {
    ip,
    country_flag,
    isp,
    city,
    state_prov,
    country_name,
    country_capital,
    country_code2,
    // capital,
    // currency,
    latitude,
    longitude,
    // time_zone,
    zipcode,
    client,
  } = data;

  const handleChange = ({ currentTarget: { value } }) => {
    const ipRegex = new RegExp(
      '^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\\.(?!$)|$)){4}$'
    );
    const isValid = ipRegex.test(value);
    setIsValidIp(isValid);
    setSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidIp) return;
    router.push(`/search?ip=${search}`);
    if (!search) router.push('/');
  };

  return (
    <Layout>
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
              elevation={3}
              onSubmit={handleSubmit}
            >
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  border: !isValidIp && '1px solid red',
                  borderRadius: 1,
                  px: 1,
                }}
                placeholder='Enter an IP address'
                inputProps={{
                  'aria-label': 'Enter an IP address',
                  maxLength: 15,
                }}
                fullWidth
                onChange={handleChange}
                error={!isValidIp}
                value={search}
                className='Mui-error'
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
              <Typography mr={2}>{client ? `Your IP: ${ip}` : ip}</Typography>
              <Image
                src={country_flag}
                alt={country_name}
                width={60}
                height={30}
              />
            </Box>
          </Box>
          <Box>
            <Typography>IP address info</Typography>
            <List dense>
              <ListItem>
                {/* <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon> */}
                <ListItemText primary={isp} />
              </ListItem>
              <ListItem>
                <ListItemText primary={city} />
              </ListItem>
              <ListItem>
                <ListItemText primary={state_prov} />
              </ListItem>
              <ListItem>
                <ListItemText primary={country_name} />
              </ListItem>
              <ListItem>
                <ListItemText primary={country_capital} />
              </ListItem>
              <ListItem>
                <ListItemText primary={latitude} />
              </ListItem>
              <ListItem>
                <ListItemText primary={longitude} />
              </ListItem>
              <ListItem>
                <ListItemText primary={country_code2} />
              </ListItem>
              <ListItem>
                <ListItemText primary={zipcode} />
              </ListItem>
            </List>
          </Box>
        </>
      )}
    </Layout>
  );
}
