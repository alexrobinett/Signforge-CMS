import { MantineProvider, Text, createStyles, AppShell, Button, Navbar, Group, getStylesRef, rem,Header, MediaQuery, Burger, useMantineTheme} from '@mantine/core';
import { ImageDropZone } from '../components/Images/ImageDrop';
import { useState } from 'react';
import { CardBadgeEX } from '../components/CardBadgeEX';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SideBar } from '../components/Sidebar';
import ImagePage from '../components/Images/ImagePage';
import { DsLogo } from '../components/misc/Dslogo';
import { AppHeader } from '../components/AppHeader';



function App() {
  const [opened, setOpened] = useState(false);

 const handleOpen = (newValue) => {
  setOpened(newValue)
 }

  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell
          padding="md"
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          header={<AppHeader handleOpen={ handleOpen} {...opened} />}
          navbar={ <SideBar opened={opened} /> }
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
        <Routes>
          <Route path='/assets' element={<ImagePage />} />
          <Route path='/demo' element={<CardBadgeEX/>} />
          {/* <Route path='/players' element={} /> */}
        </Routes>

        </AppShell>
    </MantineProvider>
    </BrowserRouter>
  )
}


export {App}