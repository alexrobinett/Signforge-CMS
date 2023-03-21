import { Card, Image, Text, Badge, Button, Group, Flex, TextInput, Divider, ActionIcon, useMantineTheme} from '@mantine/core';
import {useMediaQuery } from '@mantine/hooks'
import { IconTrashFilled, IconCheck } from '@tabler/icons-react';
import { apiClient, fetchImages,} from '../../app/api/api';
import { useState } from 'react';
import {  useNavigate} from 'react-router-dom';
import { useUpdateImageMutation, useDeleteImageMutation } from '../../app/features/images/imagesAPI';

function AssetCard({ imageURL, id, fileName, refetchImages }) {
const theme = useMantineTheme();
const isMobile = useMediaQuery('(max-width: 568px)');
const [editing, setEditing] = useState(false);
const [fileNameState, setFileNameState] = useState(fileName)
const [updateImage,{
  isLoading,
  isSuccess,
  isError,
  error,
}] = useUpdateImageMutation()

const [deleteImage,{}] = useDeleteImageMutation()


  return (
    <Card shadow="sm" padding="lg" radius="md" height={isMobile ? 200 : 250} withBorder>
    <Card.Section>
      <Image
        src={imageURL}
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
          defaultValue={fileName}
          onChange={(event) =>
            setFileNameState(event.target.value)
          }
          mr={0}
          rightSection={<ActionIcon size={32}  onClick={async ()=>{ await updateImage({"id": id, "file": `${fileNameState}`}), await refetchImages() ,setEditing(!editing)}} 
          color={theme.primaryColor} variant="filled"><IconCheck/></ActionIcon>}
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
          {fileName}
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
        onClick={async() => {
        await deleteImage(id)
        refetchImages()
        }}
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