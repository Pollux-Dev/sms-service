import { SvgIcon } from '@mui/material';
import {
  ContactPage,
  DashboardTwoTone,
  Outbox,
  Send,
} from '@mui/icons-material';
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
        <Send />
      </SvgIcon>
    ),
  },
  {
    title: 'Contact Manager',
    path: '/contact-manager',
    icon: (
      <SvgIcon fontSize="small">
        <ContactPage />
      </SvgIcon>
    ),
  },
  {
    title: 'Out Box',
    path: '/out-box',
    icon: (
      <SvgIcon fontSize="small">
        <Outbox />
      </SvgIcon>
    ),
  },
];
