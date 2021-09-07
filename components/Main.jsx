/* eslint-disable camelcase */
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';
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
  const [search, setSearch] = useState('');
  const isMobile = useMediaQuery('(max-width: 540px)');
  const router = useRouter();

  const {
    ip,
    country_flag,
    // isp,
    // city,
    // state,
    country,
    // capital,
    // country_code,
    // currency,
    // currency_symbol,
    // latitute,
    // longitude,
    // timezone,
    // timezone_name,
    // timezone_gmt,
    client,
  } = data;

  const handleChange = ({ currentTarget: { value } }) => setSearch(value);

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/search?ip=${search}`);
    console.log('Submitted', search);
  };
  return (
    <Layout>
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
            sx={{ ml: 1, flex: 1 }}
            placeholder='Enter an IP address'
            inputProps={{
              'aria-label': 'Enter an IP address',
              maxLength: 15,
            }}
            onChange={handleChange}
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
            // src='https://ipgeolocation.io/static/flags/in_64.png'
            alt={country}
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
    </Layout>
  );
}
