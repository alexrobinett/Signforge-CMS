import React from 'react';
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
  MantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { DsLogo } from '../components/misc/Dslogo';
import { Outlet } from '@tanstack/react-router';

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme: MantineTheme) => ({
  header: {
    backgroundColor: theme.fn.variant({
      variant: 'filled',
      color: theme.primaryColor,
    }).background,
    border: 'none',
  },

  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

interface HomePageProps {
  m?: number;
}

function HomePage({ m }: HomePageProps = {}): JSX.Element {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Header height={HEADER_HEIGHT} className={classes.header}>
        <Container className={classes.inner} fluid>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            <DsLogo />
          </Group>
          <Group></Group>
          {/* <Button radius="sm" h={30} variant="white" color="black">
              Login
            </Button> */}
        </Container>
      </Header>
      <Outlet />
    </>
  );
}

export { HomePage };
