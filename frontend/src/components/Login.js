import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { setCredentials } from '../store/authSlice';
import { login } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await login(email, password);
      const decodedToken = jwtDecode(response.token);
      const userData = {
        token: response.token,
        user: {
          ...response.user,
          id: decodedToken.userId,
          username: decodedToken.username,
          email: email
        }
      };
      dispatch(setCredentials(userData));
      navigate('/?login=success');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
        <Box
        minH={'calc(100vh - 60px - 60px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        >

      <Stack spacing={6} maxW={'md'} w={'full'} mx={'auto'} py={8} px={4}> 
        <Stack align={'center'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <Text fontSize={'md'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'md'}
          p={6} /* Reduced padding for the form box */
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  type="submit"
                  bg={'brand.primary'}
                  color={'white'}
                  _hover={{
                    bg: 'gray.700',
                  }}
                  isLoading={isLoading}
                  w={'full'} /* Full width button */
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Text align={'center'} fontSize={'sm'}>
          Don't have an account?{' '}
          <Link as={RouterLink} to="/register" color={'blue.400'}>
            Sign up
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};

export default Login;
