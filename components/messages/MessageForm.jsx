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
    console.log(allImages)
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
    initialValues: { firstName: '', lastName: '', email: '', password:'',
    confirmPassword: '' },

 
    // functions will validate values at corresponding key
    validate: {
      firstName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      lastName: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? null : 'Password must contain at least 8 characters and at least one number'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null
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
        <TextInput  mt="sm"  label="Quantity" placeholder="2" {...form.getInputProps('firstName')} required/>
        <TextInput mt="sm"  label="Price" placeholder="4" {...form.getInputProps('lastName')} required/>
        <TextInput mt="sm"  label="Points" placeholder="400" {...form.getInputProps('email')} required/>
        </Group>
        </Stack>
        <Stack>
        <AspectRatio ratio={1920 / 1080} maw={500} m={12}>
        <Card bg="black"shadow="sm">Test</Card>
        </AspectRatio>
        </Stack>
    </Group> 
         
        
      
       

        <Group grow>
        <TextInput mt="sm" label="Promo Line One" placeholder="BUY ANY 2" {...form.getInputProps('email')} required/>
        <TextInput mt="sm" label="Promo Line Two" placeholder="POWERADE" {...form.getInputProps('email')} required/>
        <TextInput mt="sm" label="Promo Line Three" placeholder="All Flavours, 710mL" {...form.getInputProps('email')} required/>
        </Group>
        
        <Group grow>
        <TextInput mt="sm" label="Disclaimer Line One" placeholder="Legal Copy" {...form.getInputProps('email')} required/>
        <TextInput mt="sm" label="Disclaimer Line Two" placeholder="Legal Copy" {...form.getInputProps('email')} required/>
        
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