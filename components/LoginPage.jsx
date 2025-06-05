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
  Flex,
} from '@mantine/core';
import bg from '../src/assets/bg-image/office-bg.jpg';
import { Link, Navigate, useNavigate } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';



import { useMutation } from '@tanstack/react-query';
import axiosInstance from "../app/api/axiosInstance";
import { useAuth } from "../app/context/AuthContext";

function useLogin() {
  const { setAuth } = useAuth();
  return useMutation(
    async (credentials) => {
      console.log('useLogin mutation called with:', credentials);
      try {
        const response = await axiosInstance.post('/auth', credentials);
        console.log('axiosInstance.post /auth response:', response);
        const { data } = response;
        setAuth((prev) => ({ ...prev, ...data }));
        return data;
      } catch (error) {
        console.error('Error in useLogin mutation:', error);
        throw error;
      }
    }
  );
}

const useStyles = createStyles((theme) => ({
  signUp: {
    position: 'relative',
    backgroundImage: `url(${bg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));


function LoginPage() {
  // Minimal test mutation
  const testMutation = useMutation(async ({ email, password }) => {
    console.log('Direct test mutation called with:', { email, password });
    return { email, password };
  });
  const { classes } = useStyles();  
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const login = useLogin();
  const { isLoading } = login;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, password]);

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);

  async function handleSubmit(e) {
    console.log('handleSubmit called with:', { email, password });
    try {
      // Use the direct test mutation instead of login
      const result = await testMutation.mutateAsync({ email, password });
      console.log('testMutation.mutateAsync result:', result);
      // No further logic needed for this test
    } catch (err) {
      console.error('Error in handleSubmit (test mutation):', err);
      setErrMsg('Test mutation failed');
      errRef.current.focus();
    }
  }

  return (
    <Container h="94vh" m={0} className={classes.signUp} fluid="true">
      <Container size={420} pt={30}>
        <Paper withBorder shadow="md" p={30} pt={10} mt={30} radius="md">
          <Text
            ref={errRef}
            tabIndex={-1}
            color="red"
            size="sm"
            role="alert"
            style={{ display: errMsg ? 'block' : 'none', marginBottom: 10 }}
          >
            {errMsg}
          </Text>
          <Flex
            mb={10}
            gap="sm"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <Title
              align="center"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              Welcome to SignForge!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
              Do not have an account yet?{' '}
              <Link to="../home/signuppage" preload="intent">Create account</Link>
            </Text>
          </Flex>

          <TextInput
            label="Email"
            placeholder="you@youremail.com"
            required
            type="text"
            id="email"
            value={email}
            onChange={handleUserInput}
            autoComplete="off"
            ref={userRef}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            id="password"
            value={password}
            onChange={handlePwdInput}
          />
          <Group position="apart" mt="lg">
            <Checkbox
              display="hidden"
              label="Remember me"
              id="persist"
              value={true}
            />
            <Anchor component="button" size="sm">
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

export { LoginPage };
