import { Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
import s from './navbarbottom.module.scss';
import { transparentize } from 'color2k';

const links = [
  { clr: 'rgb(174,175,255)', name: 'Sessions', link: '/sessions' },
  {
    clr: 'rgb(255,185,185)',
    name: 'Directory',
    link: '/sessions',
  },
  {
    clr: 'rgb(253,211,101)',
    name: 'Submit a Question',
    link: '/sessions',
  },
  { clr: 'rgb(101,253,189)', name: 'Meet D Team', link: '/sessions' },
  {
    clr: 'rgb(255,137,68)',
    name: 'Archives',
    link: '/sessions',
  },
];

export function NavBarBottom() {
  const [selected, setSelected] = useState(0);

  return (
    <nav className={s.container}>
      {links.map(({ link, name, clr }, idx) => (
        <Button
          key={name}
          variant="contained"
          className={s.item}
          onClick={() => setSelected(idx)}
          style={{
            backgroundColor: idx === selected ? transparentize(clr, 0.5) : '',
          }}
        >
          <Link href={link}>
            <a>{name}</a>
          </Link>

          {idx === selected && (
            <motion.div
              className={s.cursor}
              layoutId="cursor"
              animate={{ backgroundColor: links[selected].clr }}
              // style={{ backgroundColor: clr }}
            />
          )}
        </Button>
      ))}
    </nav>
  );
}
