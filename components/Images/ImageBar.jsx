import { Paper, Button,  Modal, Group, Pagination, Autocomplete} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ImageDropZone } from './ImageDrop';
import { IconSearch } from '@tabler/icons-react';




function ImageBar() {
  
  function handleUploadClose(){
    return close()
  }
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Paper shadow="xs" mx="md" p="xs" >
        <Group position="apart">
        <Autocomplete placeholder='Search' icon={<IconSearch />} data={['React', 'Angular', 'Svelte', 'Vue']} />
        {/* <Pagination total={2} /> */}
        <Button onClick={open}>Upload +</Button>
        </Group>
        
        <Modal opened={opened} onClose={close}   title="Image Upload" centered>
        <ImageDropZone handle={handleUploadClose}/>
        </Modal>

       
        </Paper>
      </>
    );
  }

  export {ImageBar}