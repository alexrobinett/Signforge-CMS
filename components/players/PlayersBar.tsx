import { Paper, Button, Modal, Group, Autocomplete } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { IconSearch } from '@tabler/icons-react';
import { NewPlayer } from './newPlayer';

function PlayersBar() {
  function handleClose() {
    return close();
  }

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Paper shadow="xs" mx="sm" p="sm">
        <Group position="apart">
          {/* <Autocomplete placeholder='Search' icon={<IconSearch />} data={['React', 'Angular', 'Svelte', 'Vue']} /> */}
          <Button onClick={open}>New Player +</Button>
        </Group>

        <Modal opened={opened} onClose={close} centered>
          <NewPlayer handleClose={handleClose} />
        </Modal>
      </Paper>
    </>
  );
}

export { PlayersBar };
