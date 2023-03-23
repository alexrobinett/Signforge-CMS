import { useForm } from '@mantine/form';
import { TextInput, Button,PasswordInput, Paper, Container, Title, createStyles, Flex , Group, Center, Box, rem, Anchor , Text} from '@mantine/core';
import bg from '../src/assets/bg-image/office-bg.jpg'
import { IconArrowLeft } from '@tabler/icons-react';
import { Link , useNavigate } from 'react-router-dom';
import { useAddNewUserMutation } from '../app/features/users/usersApiSlice';


const useStyles = createStyles((theme) => ({
    signUp: {
      position: 'relative',
      backgroundImage: `url(${bg})` ,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },

  }))







function SignUpPage() {

  const [addNewUser,{
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()

const { classes } = useStyles();
const navigate = useNavigate();
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


  function handleNewUserSubmit(data){
    try{
      addNewUser({...data})
      navigate("../login")
    
    }catch{
      console.error(error)
    }
  }

  return (
    <Container h="94vh"  m={0} className={classes.signUp} fluid="true">

      <Container size={420} pt={30} >
        <Paper withBorder shadow="md" p={30} pt={10} mt={30} radius="md">
        <Flex mb={10}
          gap="sm"
          justify="center"
          align="center"
          direction="column"
          wrap="wrap">
          <Title
            align="start"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900,})}
          >
            Sign Up
          </Title>
        </Flex>
  
      <form onSubmit={form.onSubmit((values)=> handleNewUserSubmit(values))}>
        <TextInput label="First Name" placeholder="Johnny" {...form.getInputProps('firstName')} required/>
        <TextInput label="Last Name" placeholder="AppleSeed" {...form.getInputProps('lastName')} required/>
        <TextInput mt="sm" label="Email" placeholder="Email" {...form.getInputProps('email')} required/>
        <PasswordInput required
          label="Password"
          placeholder="Password"
          {...form.getInputProps('password')}
        />
        <PasswordInput required
          mt="sm"
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps('confirmPassword')}
        />
        
        <Group position="apart">
        <Text color="dimmed" size="sm" className={classes.control}>
          <Link to='../login'>
              <Center inline mt={14} className={classes.control} >
                <IconArrowLeft size={rem(12)} stroke={1.5}   />
                <Box ml={5}>Back to the login page</Box>
              </Center>
          </Link>
        </Text>
          <Button type="submit" mt="md">
            Submit
          </Button>
        </Group>
      </form>
    </Paper>
    </Container>
    </Container>
  );
}

export {SignUpPage}