/* eslint-disable react/display-name */
import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import ContextWrapper from '@/context';
import { DashboardLayout } from '@/components/commons/layout';
import { CacheProvider, EmotionCache } from '@emotion/react';

import createEmotionCache from '@/createEmotoinCache';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@mui/system';
import { CssBaseline } from '@mui/material';
import Head from 'next/head';

import { NextPage } from 'next';

import adminTheme from '@/theme/admin-theme';
import '@global/index.scss';
import 'simplebar-react/dist/simplebar.min.css';
import { useNProgress } from '@/util/hooks';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const getRoleLayout = () => {
  return (page: any) => <DashboardLayout>{page}</DashboardLayout>;
};

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const getLayout = getRoleLayout();

  useNProgress();

  return (
    <>
      {/*<SessionProvider session={pageProps.session}>*/}
      <ContextWrapper>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <title>sms - service</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ThemeProvider theme={adminTheme}>
            <CssBaseline />
            <Toaster
              position={'top-right'}
              toastOptions={{
                error: {
                  style: {
                    border: 'thin solid red',
                    backgroundColor: '#FFEFEF',
                  },
                },
              }}
            />

            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </ContextWrapper>
      {/*</SessionProvider>*/}
    </>
  );
}
