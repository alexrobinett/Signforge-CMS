import { useState, useEffect } from 'react';
import { createStyles, Navbar, getStylesRef, rem, Text, Group } from '@mantine/core';
import {
    Icon2fa,
    IconDeviceTv,
    IconFile3d,
    IconLogout,
    Icon123,
    IconHome,
    IconFileUpload,
    IconMovie
  } from '@tabler/icons-react';

import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import {useMediaQuery } from '@mantine/hooks'


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
    { link: './', label: 'Home', icon: IconHome },
    { link: './players', label: 'Players', icon: IconDeviceTv },
    // { link: './playlist', label: 'Playlist', icon: IconFile3d },
    { link: './messages', label: 'Messages / Ads', icon: Icon123 },
    { link: './assets', label: 'Assets', icon: IconFile3d },
    { link: './demo', label: 'Demo Player', icon: IconMovie },
    
  ];




function SideBar({ opened} , handleOpen , mobile) {
  const isMobile = useMediaQuery('(max-width: 568px)');
  const isTablet = useMediaQuery('(min-width: 569px) and (max-width: 924px)');
  const { classes, cx } = useStyles();
  const location = useLocation();
  const navigate = useNavigate()
  const {pathname} = useLocation()
  
  function handleLogout() {
    // Clear auth context, localStorage, and redirect if needed
    localStorage.removeItem('access_token');
    window.location.href = '/home/login';
  }

const [active, setActive] = useState(() => {
  const activeItem = data.find((item) => item.link === location.pathname);
  return activeItem ? activeItem.label : 'Dashboard';
});

  useEffect(() => {
    const activeItem = data.find((item) => item.link === location.pathname);
    if (activeItem) {
      setActive(activeItem.label);
    }
  }, [location]);

  function handleClick(activeItem, isOpen, mobile) {
    setActive(activeItem);

    if (mobile) {
      handleOpen(!isOpen);
    }
  }

  const links = data.map((item) => (
    <Text
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      to={item.link}
      key={item.label}
      variant="link"
      component={Link}
      onClick={() => handleClick(item.label, opened, isMobile)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Text>
  ));

  return (
    <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 220, lg: 250 }}>
      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Group onClick={() => handleLogout()}>
          <Text className={classes.link}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Text>
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}

  export{SideBar}