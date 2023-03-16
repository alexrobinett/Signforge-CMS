import { useState } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem, Text } from '@mantine/core';
import {
    Icon2fa,
    IconDatabaseImport,
    IconDeviceTv,
    IconFile3d,
    IconLogout,
  } from '@tabler/icons-react';
import { DsLogo } from '../components/Dslogo';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
    { link: '/players', label: 'Players', icon: IconDeviceTv },
    { link: '/', label: 'Massages', icon: Icon2fa },
    { link: '/assets', label: 'Assets', icon: IconFile3d },
  ];


function SidBar() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('Players');
    const links = data.map((item) => (
      <Text
        className={cx(classes.link, { [classes.linkActive]: item.label === active })}
        to={item.link}
        key={item.label}
        variant="link"
        component={Link}
        onClick={(event) => {
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </Text>
    ));


  
    return (
    <Navbar  width={{ sm: 300 }} p="md">
          <Navbar.Section grow>
            <Group className={classes.header} position="apart">
              <DsLogo size={50} />
            </Group>
            {links}
          </Navbar.Section>
    
          <Navbar.Section className={classes.footer}>
            <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
    );
  }

  export{SidBar}