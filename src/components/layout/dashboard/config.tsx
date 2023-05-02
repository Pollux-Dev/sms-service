import { SvgIcon } from '@mui/material';
import {
  AllInbox,
  Article,
  Dashboard,
  DashboardTwoTone,
  PeopleAltTwoTone,
  Person,
  Quiz,
} from '@mui/icons-material';
import React from 'react';

export const talentPaths = [
  {
    title: 'Overview',
    path: '/dashboard/talent',
    icon: (
      <SvgIcon fontSize="small">
        <Dashboard />
      </SvgIcon>
    ),
  },
  {
    title: 'Inbox',
    path: '/dashboard/talent/orders',
    icon: (
      <SvgIcon fontSize="small">
        <AllInbox />
      </SvgIcon>
    ),
  },
  {
    title: 'Account',
    path: '/dashboard/talent/profile',
    icon: (
      <SvgIcon fontSize="small">
        <Person />
      </SvgIcon>
    ),
  },
  {
    title: 'FAQ',
    path: '/faqs',
    icon: (
      <SvgIcon fontSize="small">
        <Quiz />
      </SvgIcon>
    ),
  },
  {
    title: 'Terms of service',
    path: '/terms',
    icon: (
      <SvgIcon fontSize="small">
        <Article />
      </SvgIcon>
    ),
  },
];
export const adminPaths = [
  {
    title: 'Overview',
    path: '/dashboard/admin',
    icon: (
      <SvgIcon fontSize="small">
        <DashboardTwoTone />
      </SvgIcon>
    ),
  },
  {
    title: 'Customers',
    path: '/dashboard/admin/customers',
    icon: (
      <SvgIcon fontSize="small">
        <PeopleAltTwoTone />
      </SvgIcon>
    ),
  },
];
