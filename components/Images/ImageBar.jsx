import { Paper, Button,  Modal, Group, Pagination, Autocomplete, LoadingOverlay} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ImageDropZone } from './ImageDrop';
import { IconSearch } from '@tabler/icons-react';




function ImageBar() {
  
  function handleUploadClose(){
    return close()
  }

  function handleLoading(){
    handlers.open()
  }
    const [opened, { open, close }] = useDisclosure(false);
    const [visible, handlers] = useDisclosure(false);
    return (
      <>
        <Paper shadow="xs" mx="md" p="xs" >
        <Group position="apart">
        {/* <Autocomplete placeholder='Search' icon={<IconSearch />} data={['React', 'Angular', 'Svelte', 'Vue']} /> */}
        {/* <Pagination total={2} /> */}
        <Button onClick={open}>Upload +</Button>
        </Group>
        
        <Modal opened={opened} onClose={close}   title="Image Upload" centered>
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <ImageDropZone handle={handleUploadClose} handleLoading={handlers}/>
        </Modal>

       
        </Paper>
      </>
    );
  }

  export {ImageBar}