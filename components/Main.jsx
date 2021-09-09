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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Layout from './Layout';

import defaultFlag from '../public/flag.svg';

export default function Main({ data }) {
  const router = useRouter();
  const q = router.pathname !== '/' && router.query.ip;
  const [search, setSearch] = useState(q || '');
  const [isValidIp, setIsValidIp] = useState(true);
  const isMobile = useMediaQuery('(max-width: 540px)');

  useEffect(() => {
    if (q) setSearch(q);
  }, [q]);

  useEffect(() => {
    if (!search) router.push('/');
  }, [search]);

  const {
    ip,
    country_flag,
    isp: ISP,
    calling_code,
    city: City,
    state_prov: State,
    country_name: Country,
    country_capital: Capital,
    country_code2: Code,
    currency,
    latitude: Latitude,
    longitude: Longitude,
    time_zone,
    zipcode,
    continent_name,
    client,
    message,
  } = data;

  const ipData = {
    ISP,
    'Calling code': calling_code,
    City,
    State,
    Country,
    Capital,
    'Country code': Code,
    Currency: currency?.name,
    'Currency symbol': currency?.symbol,
    Latitude,
    Longitude,
    'Time zone': time_zone?.name,
    'Current time': time_zone?.current_time,
    'Zip code': zipcode,
    Continent: continent_name,
  };

  const tableRows = Object.entries(ipData);

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
    if (!isValidIp || !search) return;
    if (search) router.push(`/search?ip=${search}`);
    else router.push('/');
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
              py: !isMobile && 4,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Paper
              component='form'
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? 280 : 400,
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
                flexWrap: 'wrap',
              }}
            >
              <Typography mr={!isMobile && 2} textAlign='center'>
                {client ? `Your IP: ${ip}` : ip || q}
              </Typography>
              {!message && (
                <Image
                  src={country_flag || defaultFlag}
                  alt={Country}
                  width={60}
                  height={30}
                />
              )}
            </Box>
          </Box>
          <Box mb={4} sx={{ textAlign: 'center', p: 2 }}>
            <Typography variant='h5' mt={2} mb={2}>
              IP address info
            </Typography>

            {message ? (
              <Paper>
                {message === 'loading' ? (
                  <CircularProgress sx={{ m: 2 }} />
                ) : (
                  <Typography p={3}>{message}</Typography>
                )}
              </Paper>
            ) : (
              <TableContainer component={Paper}>
                <Table
                  sx={{ width: !isMobile ? 550 : 'auto' }}
                  size='small'
                  aria-label='a dense table'
                >
                  <TableBody>
                    {tableRows.map((row) => (
                      <TableRow
                        key={row[0]}
                        hover
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell
                          component='th'
                          scope='row'
                          sx={{ width: '50%' }}
                        >
                          {row[0]}
                        </TableCell>
                        <TableCell align='right'>{row[1]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </>
      )}
    </Layout>
  );
}
