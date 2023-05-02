import React from 'react';
import s from './fixed.module.scss';

import { Typography } from '@mui/material';
import Link from 'next/link';

const FixedLayer = () => {
  const links = ['About', 'FAQs', 'Contact Us'];

  return (
    <div className={s.container}>
      <nav className={s.nav_top}>
        <Typography noWrap className={s.meet} variant="subtitle2">
          MEET D EXPERTS
        </Typography>

        <div className={s.links}>
          {links.map((link) => (
            <Link href="/" key={link}>
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default FixedLayer;
