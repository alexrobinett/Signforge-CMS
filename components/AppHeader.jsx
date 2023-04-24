import { useState } from 'react';
import { Header, MediaQuery, Burger, useMantineTheme } from '@mantine/core';
import { DsLogo } from './misc/Dslogo';

function AppHeader({ handleOpen, opened }) {
  const theme = useMantineTheme();

  return (
    <Header height={{ base: 40, md: 60 }} p="md" bg="blue.6">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => handleOpen((o) => !o)}
            size="sm"
            color="white"
            mr="xl"
          />
        </MediaQuery>

        <DsLogo size={50} />
      </div>
    </Header>
  );
}

export { AppHeader };
