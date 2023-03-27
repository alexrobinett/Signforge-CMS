import { useForm } from '@mantine/form';
import { TextInput, Title, createStyles, Flex , Group,  Select, AspectRatio, Image, Card, Stack} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link , useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllImages, useGetImagesQuery } from '../../app/features/images/imagesAPI';




function MessageForm() {
    const {
        data: images,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch, 
    } = useGetImagesQuery()
    
    const allImages = useSelector(selectAllImages);
    useEffect(() => {
        if (isSuccess) {
          const newDropDownData = allImages.map((image) => ({
            value: `${image.imageURL}`,
            label: `${image.fileName}`,
          }));
          setImageDropDownData(newDropDownData);
        }
      }, [isSuccess, allImages]);
    

const navigate = useNavigate();
const [imageDropDownData, setImageDropDownData] = useState([])
const form = useForm({
    initialValues: { quantity: '', price: '', points: '', promo:'', promoLineOne:'', promoLineTwo:'',  disclaimerLineOne:'',  disclaimerLineTwo:'',
    imageOne: '',  imageTwo: '',  imageThree: '' },

 
    // functions will validate values at corresponding key
    validate: {
       quantity: (value) => (value.length > 2 ? 'Quantity must have one number' : null),
       price: (value) => (value.length >= 2 ? 'price must have one number' : null),
       points: (value) => (value.length < 2 ? 'needs two or three numbers' : null),
       promo: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
       promoLineOne: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
       promoLineTwo: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
       disclaimerLineOne: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
       disclaimerLineTwo: (value) => (value.length < 2  ? null : 'Invalid email'),
    },
  });


  return (
    <>
    <form onSubmit={form.onSubmit((values)=> handleNewUserSubmit(values))}>
     <Group grow >
        <Stack justify="start">
        <Title  mt={0}  >
                C-Store Promo
        </Title>
        <Group grow>
        <TextInput  mt="sm"  label="Quantity" placeholder="2" {...form.getInputProps('quantity')} required/>
        <TextInput mt="sm"  label="Price" placeholder="4" {...form.getInputProps('price')} required/>
        <TextInput mt="sm"  label="Points" placeholder="400" {...form.getInputProps('points')} required/>
        </Group>
        </Stack>
        <Stack>
        <AspectRatio ratio={1920 / 1080} maw={500} m={12}>
        <Card bg="black"shadow="sm">Test</Card>
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
        />
        </Group>
      </form>
      </>
  );
}

export {MessageForm}