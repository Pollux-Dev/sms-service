import React, { useState } from 'react';
import s from './send.module.scss';
import { Container, Tab, Typography } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import Single from '@/scenes/Send/Single';
import Head from 'next/head';
import Bulk from '@/scenes/Send/Bulk';

export const statuses = [
  {
    label: 'Single SMS',
    value: 'single',
  },
  {
    label: 'Bulk SMS',
    value: 'bulk',
  },
  {
    label: 'Custom SMS',
    value: 'custom',
  },
];

const Send = () => {
  const [activeStatusTab, setActiveStatusTab] = useState(statuses[0]);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveStatusTab(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      statuses.find((status) => status.value === newValue)!,
    );
  };

  return (
    <div className={s.container}>
      <Head>
        <title>sms | send</title>
      </Head>
      <Container maxWidth={'xxl' as any} className={s.wrapper}>
        <header>
          <Typography variant="h3">Send SMS</Typography>
        </header>

        <TabContext value={activeStatusTab.value}>
          <TabList onChange={handleChange} className={s.tab_header}>
            {statuses.map(({ label, value }) => (
              <Tab key={label} label={label} value={value} className={s.tab} />
            ))}
          </TabList>

          <Single />

          <Bulk />
        </TabContext>
      </Container>
    </div>
  );
};

export default Send;
