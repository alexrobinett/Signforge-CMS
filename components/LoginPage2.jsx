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
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
    background: `url(${bg}) center center/cover no-repeat`,
    minHeight: '100vh',
    minWidth: '100vw',
  },
}));

function LoginPage() {
  // Real login mutation
  const login = useMutation({
    mutationFn: async ({ email, password }) => {
      console.log('login mutation called with:', { email, password });
      try {
        const response = await axiosInstance.post('/auth', { email, password });
        console.log('axiosInstance.post /auth response:', response);
        const { data } = response;
        setAuth((prev) => ({ ...prev, ...data }));
        return data;
      } catch (error) {
        console.error('Error in login mutation:', error);
        throw error;
      }
    }
  });
  const { isLoading } = login; // already set above

  const { classes } = useStyles();  
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const { setAuth } = useAuth();

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
      const result = await login.mutateAsync({ email, password });
      console.log('login.mutateAsync result:', result);
      const { accessToken, user } = result;
      localStorage.setItem('access_token', accessToken);
      setAuth({ token: accessToken, user });
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (err) {
      console.error('Error in handleSubmit:', err);
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
          <Flex direction="column" gap="md">
            <Title order={2} align="center" mb={10}>
              Sign In
            </Title>
            <TextInput
              label="Email"
              placeholder="you@email.com"
              required
              id="email"
              value={email}
              onChange={handleUserInput}
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
          </Flex>
        </Paper>
      </Container>
    </Container>
  );
}

export { LoginPage };
