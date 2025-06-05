import React from 'react';
import { useState } from 'react';
import { AppHeader } from './AppHeader';
import { MantineProvider, AppShell } from '@mantine/core';
import { SideBar } from './Sidebar';
import { Outlet } from 'react-router-dom';
function DashboardLayout() {
  const [opened, setOpened] = useState(false);

  const handleOpen = (newValue) => {
    setOpened(newValue);
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        header={<AppHeader handleOpen={handleOpen} {...opened} />}
        navbar={<SideBar opened={opened} handleOpen={handleOpen} />}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Outlet />
      </AppShell>
    </MantineProvider>
  );
}

export { DashboardLayout };
