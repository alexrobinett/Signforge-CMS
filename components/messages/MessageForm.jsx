import { useForm } from '@mantine/form';
import { TextInput, Title, createStyles, Flex , Group,  Select, AspectRatio, Image, Card, Stack} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link , useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllImages, useGetImagesQuery } from '../../app/features/images/imagesAPI';
import { SplitSaveButton } from './SplitSaveButton';
import { SplitUpdateButton } from './SplitUpdateButton';
import { selectMessageByID, useGetMessagesQuery} from '../../app/features/message/messagesApiSlice';



function MessageForm({playerId, handleTrashClick, messageUpdate, messageId, setMessageUpdate}) {
    const {
        data: images,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch, 
    } = useGetImagesQuery()
    const allImages = useSelector(selectAllImages);

    const {
      data: messages,
      refetch: refetchMessages
  } = useGetMessagesQuery()
  
  const updateMessage = useSelector((state) => selectMessageByID(state, messageId));


    useEffect(() => {
        if (isSuccess) {
          const newDropDownData = allImages.map((image) => ({
            value: `${image.imageURL}`,
            label: `${image.fileName}`,
          }));
          setImageDropDownData(newDropDownData);
        }
      }, [isSuccess, allImages]);
    

      
const [imageDropDownData, setImageDropDownData] = useState([])
const form = useForm({

    initialValues: { quantity: '', price: '', points: '', promo:'', promoLineOne:'', promoLineTwo:'',  disclaimerLineOne:'',  disclaimerLineTwo:'',
    imageOne: '',  imageTwo: '',  imageThree: '', player: ``, id: '640bf6e47781518ed5c23575', draft: false, messageName: '', messageType: 'C-Store Promo'  },
 
    // functions will validate values at corresponding key
    validate: {
       quantity: (value) => (value.length > 2 ? 'Quantity must have one number' : null),
       price: (value) => (value.length >= 2 ? 'price must have one number' : null),
    },
  });

  useEffect(() => {
    form.setFieldValue('player', playerId)
  }, [playerId]);

  useEffect(() => {
    if (messageUpdate &&  updateMessage) {
      Object.keys(updateMessage).forEach((key) => {
        form.setFieldValue(key, updateMessage[key]);
      });
    }
  }, [updateMessage, messageUpdate, messages]);




  return (
    <>
    <form onSubmit={form.onSubmit((values) => {
     form.setFieldValue('player', playerId)
    })}>
    <Title  mt={0}  >
                C-Store Promo
    </Title>
     <Group grow >
        <Stack justify="start">
        <Group grow>
            <TextInput  mt="sm"  label="Message Name" placeholder="C-store-Promo-Powerade" {...form.getInputProps('messageName')} required/>
        </Group>
        <Group grow>
            <TextInput  mt="sm"  label="Quantity" placeholder="2" {...form.getInputProps('quantity')} required/>
            <TextInput mt="sm"  label="Price" placeholder="4" {...form.getInputProps('price')} required/>
            <TextInput mt="sm"  label="Points" placeholder="400" {...form.getInputProps('points')} required/>
        </Group>
        </Stack>
        <Stack>
            <AspectRatio ratio={1920 / 1080} maw={500} m={12}>
                <Card bg="grey"shadow="sm">Preview</Card>
            </AspectRatio>
        </Stack>
    </Group> 
         
        
      
       

        <Group grow>
        <TextInput mt="sm" label="Promo Line One" placeholder="BUY ANY 2" {...form.getInputProps('promo')} required/>
        <TextInput mt="sm" label="Promo Line Two" placeholder="POWERADE" {...form.getInputProps('promoLineOne')} required/>
        <TextInput mt="sm" label="Promo Line Three" placeholder="All Flavours, 710mL" {...form.getInputProps('promoLineTwo')} required/>
        </Group>
        
        <Group grow>
        <TextInput mt="sm" label="Disclaimer Line One" placeholder="Legal Copy" {...form.getInputProps('disclaimerLineOne')} required/>
        <TextInput mt="sm" label="Disclaimer Line Two" placeholder="Legal Copy" {...form.getInputProps('disclaimerLineTwo')} required/>
        
        </Group >
        
        <Group grow>
        <Select
        w={200}
        mt="sm"
        label="Left Image"
        placeholder="Image One"
        maxDropdownHeight={160}
        searchable limit={20}
        data={imageDropDownData}
        nothingFound="Nothing found"
        {...form.getInputProps('imageOne')} 
        />
         <Select
        mt="sm"
        w={200}
        data={imageDropDownData}
          label="Center Image"
        placeholder="Image Two"
        maxDropdownHeight={160}
        searchable limit={20}
        nothingFound="Nothing found"
        {...form.getInputProps('imageTwo')} 
        />
         <Select
        label="Right Image"
        mt="sm"
        w={200}
        data={imageDropDownData}
        placeholder="Image Three"
        maxDropdownHeight={160}
        searchable limit={20}
        nothingFound="Nothing found"
        {...form.getInputProps('imageThree')} 
        />
        </Group>
        <Group mt={16} position="right">
        {messageUpdate ? <SplitUpdateButton formData={form.values} form={form} playerId={playerId} handleTrashClick={handleTrashClick} refetchMessages={refetchMessages} setMessageUpdate={setMessageUpdate}/>  :<SplitSaveButton formData={form.values} form={form} playerId={playerId} handleTrashClick={handleTrashClick}/>}
        </Group>
      </form>
      </>
  );
}

export {MessageForm}