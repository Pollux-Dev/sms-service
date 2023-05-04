import React, { FC } from 'react';
import AppProvider from '@/context/app';
import { MotionValueContextWrapper } from '@/context/MotionValuesContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ContextWrapper: FC<{ children: React.ReactElement }> = ({
  children,
}: any) => {
  return (
    <AppProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MotionValueContextWrapper>{children}</MotionValueContextWrapper>
      </LocalizationProvider>
    </AppProvider>
  );
};
export default ContextWrapper;
