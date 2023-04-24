import { useRef } from 'react';
import {
  Text,
  Group,
  Button,
  createStyles,
  rem,
  LoadingOverlay,
  SimpleGrid,
} from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import { useAddNewImageMutation } from '../../app/features/images/imagesAPI';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: rem(30),
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: 'absolute',
    width: rem(250),
    left: `calc(50% - ${rem(125)})`,
    bottom: rem(-20),
  },
}));

function ImageDropZone(props) {
  const [files, setFiles] = useState([]);
  const { classes, theme } = useStyles();
  const openRef = useRef();
  const navigate = useNavigate();

  const [addNewImage, { isLoading, isSuccess, isError, error }] =
    useAddNewImageMutation();

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append('id', '640bf6e47781518ed5c23575');
    formData.append('photo', file);

    return formData;
  }

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  async function handleImageDrop(file) {
    try {
      await addNewImage(await uploadImage(file));
      props.handle();
      navigate('./');
      props.handleLoading.close();
    } catch {
      console.error("could't upload file!");
    }
  }

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={(acceptedFiles) => {
          props.handleLoading.open();
          acceptedFiles.forEach((file) => {
            handleImageDrop(file);
          });
        }}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.png]}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload
                size={rem(50)}
                color={theme.colors[theme.primaryColor][6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={rem(50)}
                color={
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[0]
                    : theme.black
                }
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Needs To Be a Transparent PNG</Dropzone.Reject>
            <Dropzone.Idle>Upload Assets</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop images Files here to upload. We can only
            Accept transparent PNG
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        Select files
      </Button>
    </div>
  );
}

export { ImageDropZone };
