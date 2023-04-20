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
  import { Link, Navigate, useNavigate } from 'react-router-dom';
  import { useState, useRef, useEffect } from 'react';

  import { useDispatch } from 'react-redux';
  import { setCredentials } from '../app/features/auth/authSlice';
  import { useLoginMutation } from '../app/features/auth/authApiSlice';
  import usePersist from '../hooks/usePersist'


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
  const userRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist(true)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, {isLoading}] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  },[])

  useEffect(() => {
    setErrMsg('')
  }, [email , password])

  const handleUserInput = (e) => setEmail(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  // const handleToggle = () => {setPersist(prevVal => !prevVal)};


  async function handleSubmit(e){
    try{
      const { accessToken } = await login({email, password}).unwrap()

      localStorage.setItem("access_token", accessToken);
      dispatch(setCredentials({ accessToken: accessToken}));
      setEmail('')
      setPassword('')
      navigate('/dashboard')
    }catch(err){
      if (!err.status) {
        setErrMsg('No Server Response');
    } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.status === 401) {
        setErrMsg('Unauthorized');
    } else {
        setErrMsg(err.data?.message);
    }
    errRef.current.focus();
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
            align="center"
            sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900,})}
          >
            Welcome to SignForge!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5} >
            Do not have an account yet?{' '}
            <Link to="../home/signuppage" >
            Create account
            </Link>
          </Text>
        </Flex>
        
          <TextInput label="Email" placeholder="you@youremail.com" required type='text' id='email' value={email} onChange={handleUserInput} autoComplete='off'ref={userRef}/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md" id='password'  value={password} onChange={handlePwdInput} />
          <Group position="apart" mt="lg">
            <Checkbox  display="hidden" label="Remember me" id="persist" value={true} onChange={() => handleToggle()}/>
            <Anchor  component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={() => handleSubmit()}>
            Sign in
          </Button>
        </Paper>
      </Container>
      </Container>
    );
  }

 export {LoginPage}