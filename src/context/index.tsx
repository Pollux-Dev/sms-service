import React, { FC } from 'react';
import AppProvider from '@/context/app';
import { MotionValueContextWrapper } from '@/context/MotionValuesContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ContextWrapper: FC<{ children: React.ReactElement }> = ({
  children,
}: any) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MotionValueContextWrapper>{children}</MotionValueContextWrapper>
        </LocalizationProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};
export default ContextWrapper;
