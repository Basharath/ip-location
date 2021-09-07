import Head from 'next/head';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Layout({
  title = 'IP location finder',
  description = 'Just description',
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
      </Head>
      <Box
        sx={{
          mt: 9,
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
          sx={{ cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
          IP location finder
        </Typography>
        {children}
      </Box>
    </>
  );
}
