import type { AppProps } from 'next/app';
import ContextWrapper from '@/context';
import Layout from '@/components/commons/layout';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '@/createEmotoinCache';
import RouteChangeEvent from '@/util/helpers/RouteChangeEvent';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { CssBaseline } from '@mui/material';
import ThemeProvider from '@mui/system/ThemeProvider';
import Head from 'next/head';
import theme from '@/theme';
import '@global/index.scss';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const event = RouteChangeEvent.GetInstance();

export default function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: any) => {
      event.emit('start', url);
    };

    const handleStop = (url: any) => {
      event.emit('end', url);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <ContextWrapper>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Rahove . Portfolio</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </ContextWrapper>
  );
}
