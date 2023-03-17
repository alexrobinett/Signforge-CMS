import { Card, Image, Text, Badge, Button, Group, Flex, TextInput, useMantineTheme} from '@mantine/core';
import {useMediaQuery } from '@mantine/hooks'
import { IconTrashFilled } from '@tabler/icons-react';
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
  
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section>
      <Image
        src={asset.imageURL}
        height={isMobile ? 200 : 250}
        alt=""
        fit="scale-down"
      />
    </Card.Section>

    <Group position="apart" mt="md" mb="xs">
      {editing ? (
        <TextInput
          value={asset.fileName}
          onChange={(event) =>
            updateImageName(asset._id, event.target.value)
          }
        />
      ) : (
        <Text
          weight={500}
          size={isMobile ? 'sm' : 'md'}
          style={{ margin: '0.5rem' }}
        >
          {asset.fileName}
        </Text>
      )}
    </Group>

    <Group position="center" spacing="xl" grow="true">
        <Button
        onClick={() => setEditing(!editing)}
        variant="light"
        color="blue"
        radius="md"
      >
        {editing ? 'Done' : 'Edit'}
      </Button>
      <Button
        onClick={() => deleteImage(asset.id)}
        variant="outline"
        color='red'
        radius="md"
        size="sm"
      >
        <IconTrashFilled size={20} />
      </Button>
      
    </Group>
  </Card>

);
}

export {AssetCard}