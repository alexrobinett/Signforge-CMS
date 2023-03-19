import { Container, MantineProvider,Paper, Text, Button,  Modal, Group, Pagination,Chip} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ImageDropZone } from './ImageDrop';



function ImageBar() {
  
  function handleUploadClose(){
    return close()
  }
    const [opened, { open, close }] = useDisclosure(false);
    return (
      <>
        <Paper shadow="xs" mx="md" p="md" >
        <Group position="apart">
        <Pagination total={4} />
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