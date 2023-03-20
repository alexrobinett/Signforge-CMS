import { Container, MantineProvider,Paper, Text, Button,  Modal, Group, Pagination, Autocomplete} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { IconSearch } from '@tabler/icons-react';

function PlayersBar() {
  

    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Paper shadow="xs" mx="sm" p="sm" >
        <Group position="apart">
        <Autocomplete placeholder='Search' icon={<IconSearch />} data={['React', 'Angular', 'Svelte', 'Vue']} />
        <Button onClick={open}>New Player +</Button>
        </Group>
        
        <Modal opened={opened} onClose={close}   title="New Player" centered>
        </Modal>

       
        </Paper>
      </>
    );
  }

  export {PlayersBar}