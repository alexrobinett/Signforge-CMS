import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    createStyles, 
    Flex
  } from '@mantine/core';
  import bg from '../src/assets/bg-image/office-bg.jpg'
  import { Link, Navigate, redirect } from 'react-router-dom';


  const useStyles = createStyles((theme) => ({
    signUp: {
      position: 'relative',
      backgroundImage: `url(${bg})` ,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

  }))

  

  

  
function LoginPage() {

  const { classes } = useStyles();
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
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900,})}
          >
            Welcome to SignForge!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5} >
            Do not have an account yet?{' '}
            <Link to="../signup" >
            Create account
            </Link>
          </Text>
        </Flex>
        
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Your password" required mt="md" />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
      </Container>
    );
  }

 export {LoginPage}