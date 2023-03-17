import { Card, Image, Text, Badge, Button, Group, Flex, TextInput, Divider, ActionIcon, useMantineTheme} from '@mantine/core';
import {useMediaQuery } from '@mantine/hooks'
import { IconTrashFilled, IconCheck } from '@tabler/icons-react';
import { apiClient } from '../../api/api';
import { useState } from 'react';


function AssetCard(asset) {
const [editing, setEditing] = useState(false);
const isMobile = useMediaQuery('(max-width: 568px)');

async function updateImageName(id, name) {
    try {
      await apiClient.patch(`/images/${id}`, { name });
      fetchImages();
    } catch (error) {
      console.error('Error updating image name:', error);
    }
  }

  async function deleteImage(id) {
    try {
      await apiClient.delete(`/images/${id}`);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  }
  const theme = useMantineTheme();
  
  return (
    <Card shadow="sm" padding="lg" radius="md" height={isMobile ? 200 : 250} withBorder>
    <Card.Section>
      <Image
        src={asset.imageURL}
        height={isMobile ? 200 : 250}
        alt=""
        mt={10}
        fit="scale-down"
      />
    </Card.Section>
    <Group  mt="sm" mb="xs" grow position="center" >
      {editing ? (
        <>
        <Group >
        <TextInput
          value={asset.fileName}
          onChange={(event) =>
            updateImageName(asset._id, event.target.value)
          }
          mr={0}
          rightSection={<ActionIcon size={32}  color={theme.primaryColor} variant="filled"><IconCheck/></ActionIcon>}
        />
      </Group >
      </>
      ) : (
        <Text
          weight={500}
          size={isMobile ? 'sm' : 'md'}
          style={{ margin: '0.5rem' }}
          truncate
        >
          {asset.fileName}
        </Text>
      )}
    </Group>
    <Divider my="" />
    <Group position="apart" spacing="lg" grow="true">
        <Button
        onClick={() => setEditing(!editing)}
        variant="light"
        color="blue"
        radius="md"
       
      >
        {editing ? 'Done' : 'Edit'}
      </Button>

      {editing? (<Button
        onClick={() => deleteImage(asset.id)}
        variant="outline"
        color='red'
        radius="md"
       
        
      >
        <IconTrashFilled size={20} />
      </Button>): null}
      
      
    </Group>
  </Card>

);
}

export {AssetCard}