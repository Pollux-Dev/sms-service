import React from 'react';
import { Alert, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import s from './outbox.module.scss';
import OutBoxTableView from '@/scenes/OutBox/OutBoxTableView';
import { useOutBoxQuery } from '@/queries/outbox';

const OutBox = () => {
  const { data } = useOutBoxQuery();

  console.log('outbox data', data);

  return (
    <Container maxWidth={'xxl' as any} className={s.container}>
      <Head>
        <title>SMS | Out-Box</title>
      </Head>

      <Stack spacing={3}>
        <header>
          <Typography variant="h3" gutterBottom>
            Out-Box
          </Typography>
        </header>

        {!data ||
          (data.length == 0 && (
            <Alert severity="info">
              <Typography>You have no outbox yet!</Typography>
            </Alert>
          ))}

        {data && data.length > 0 && <OutBoxTableView userData={data} />}
      </Stack>
    </Container>
  );
};

export default OutBox;
