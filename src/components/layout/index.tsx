import React from 'react';
import s from './layout.module.scss';
import FixedLayer from '@/components/commons/FixedLayer';
import { motion } from 'framer-motion';

import { useRouter } from 'next/router';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div id="recaptcha-container"></div>
      <FixedLayer />
      <motion.div className={s.root}>
        {/*{router.pathname.startsWith('/dashboard') && <DashboardSideNav />}*/}
        {/*{router.pathname.startsWith('/admin') && <DashboardAdminSideNav />}*/}

        <div className={s.wrapper}>
          <main>{children}</main>
          <footer>this is a fotter</footer>
        </div>
      </motion.div>
    </>
  );
};

export default Layout;
