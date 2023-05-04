import React, { useState } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import s from './outbox.module.scss';
import OutBoxTableView from '@/scenes/OutBox/OutBoxTableView';

const tempData = [
  {
    id: 0,
    phone_number: 251922630485,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
  {
    id: 1,
    phone_number: 912782649,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
  {
    id: 2,
    phone_number: 911993975,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
  {
    id: 3,
    phone_number: 911614581,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
  {
    id: 4,
    phone_number: 910421839,
    category: 'MahibereKidusan',
    telecom: 'ethio-telecom',
  },
];

const OutBox = () => {
  const [userData, setUserData] = useState<any[]>(tempData);

  return (
    <Container maxWidth={'xxl' as any} className={s.container}>
      <Head>
        <title>SMS | Out-Box</title>
      </Head>

      <Stack spacing={3}>
        <header>
          <Typography variant="h3">Out-Box</Typography>
        </header>

        <OutBoxTableView userData={userData} onBack={() => null} />
      </Stack>
    </Container>
  );
};

export default OutBox;
