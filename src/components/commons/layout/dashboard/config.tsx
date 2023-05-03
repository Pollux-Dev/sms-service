import { SvgIcon } from '@mui/material';
import { DashboardTwoTone, PeopleAltTwoTone } from '@mui/icons-material';
import React from 'react';

export const adminPaths = [
  {
    title: 'Overview',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <DashboardTwoTone />
      </SvgIcon>
    ),
  },
  {
    title: 'Send SMS',
    path: '/send',
    icon: (
      <SvgIcon fontSize="small">
        <PeopleAltTwoTone />
      </SvgIcon>
    ),
  },
  {
    title: 'Contact Manager',
    path: '/contact-manager',
    icon: (
      <SvgIcon fontSize="small">
        <PeopleAltTwoTone />
      </SvgIcon>
    ),
  },
  {
    title: 'Out Box',
    path: '/out-box',
    icon: (
      <SvgIcon fontSize="small">
        <PeopleAltTwoTone />
      </SvgIcon>
    ),
  },
];
