import React, { FC } from 'react';
import AppProvider from '@/context/app';
import { MotionValueContextWrapper } from '@/context/MotionValuesContext';

const ContextWrapper: FC<{ children: React.ReactElement }> = ({
  children,
}: any) => {
  return (
    <AppProvider>
      <MotionValueContextWrapper>{children}</MotionValueContextWrapper>
    </AppProvider>
  );
};
export default ContextWrapper;
