import Head from 'next/head';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import favicon from '../public/favicon.ico';

export default function Layout({
  title = 'IP location finder',
  description = 'Find location of any IP address',
  children,
}) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />

        <link rel='shortcut icon' type='image/x-icon' href={favicon.src} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://ip-geolocate.vercel.app/' />
        <meta property='og:title' content='IP location finder' />
        <meta
          property='og:description'
          content='Find location of any IP address'
        />
        <meta
          property='og:image'
          content='https://i.postimg.cc/nrB09TWd/ip-location.png'
        />

        {/* <!-- Twitter --> */}
        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:url'
          content='https://ip-geolocate.vercel.app/'
        />
        <meta property='twitter:title' content='IP location finder' />
        <meta
          property='twitter:description'
          content='Find location of any IP address'
        />
        <meta
          property='twitter:image'
          content='https://i.postimg.cc/nrB09TWd/ip-location.png'
        />
      </Head>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          mb={4}
          variant='h4'
          component='h1'
          color='primary'
          sx={{ cursor: 'pointer', '&:hover': { color: 'dodgerblue' } }}
          onClick={() => router.push('/')}
        >
          IP location finder
        </Typography>
        {children}
      </Box>
    </>
  );
}
