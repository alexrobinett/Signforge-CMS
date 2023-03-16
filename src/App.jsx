import { MantineProvider, Text, createStyles, AppShell, Button, Navbar, Group, getStylesRef, rem,} from '@mantine/core';
import { ImageDropZone } from '../components/ImageDrop';
import { useState } from 'react';
import { CardBadgeEX } from '../components/CardBadgeEX';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { SidBar } from '../components/Sidbar';



function App() {

  return (
    <BrowserRouter>
   
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell
          padding="md"
          navbar={ <SidBar/> }
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}
        >
        <Routes>
          <Route path='/assets' element={<ImageDropZone />} />
          <Route path='/' element={<CardBadgeEX/>} />
          {/* <Route path='/players' element={} /> */}
        </Routes>

        </AppShell>
    </MantineProvider>
    </BrowserRouter>
  )
}


export {App}