import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { register } from '../services/api';
import { setCredentials } from '../store/authSlice';
import { Box, VStack, Heading, FormControl, FormLabel, Input, Button, Text, Link, Alert, AlertIcon, useColorModeValue, useToast } from '@chakra-ui/react'; 

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    // Define buttonColor using useColorModeValue
    const buttonColor = useColorModeValue('white', 'brand');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await register(username, email, password);
            if (response && response.user && response.token) {
                setSuccess('Registration successful! Redirecting to onboarding...');
                dispatch(setCredentials({
                    user: { 
                        id: response.user.id,
                        username: response.user.username, 
                        email: response.user.email,
                        onboardingCompleted: response.user.onboardingCompleted
                    },
                    token: response.token
                }));
                setTimeout(() => {
                    navigate('/onboarding');
                }, 2000);
            } else {
                throw new Error('Invalid response structure from server');
            }
        } catch (err) {
            console.error('Registration error:', err);
            if (err.message.includes('duplicate key error')) {
                setError('An account with this email or username already exists. Please try logging in or use a different email.');
            } else {
                setError('We couldn\'t create your account at this time. Please try again later or contact support if the problem persists.');
            }
        }
    };

    return (
        <Box minH="calc(100vh - 60px - 60px)" display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={8} width="100%" maxWidth="400px" boxShadow="lg" p={8} borderRadius="md" bg="white">
                <Heading>Register</Heading>
                {error && <Alert status="error"><AlertIcon />{error}</Alert>}
                {success && <Alert status="success"><AlertIcon />{success}</Alert>}
                <form onSubmit={handleSubmit} style={{width: '100%'}}>
                    <VStack spacing={4} align="stretch">
                        <FormControl>
                            <FormLabel htmlFor="username">Username:</FormLabel>
                            <Input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email:</FormLabel>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password:</FormLabel>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FormControl>
                        <Button 
                          type="submit" 
                          colorScheme="brand" // Use the brand color scheme
                          bg="brand.primary" // Set background to black
                          color={buttonColor} // Set text color based on color mode
                        >
                          Register
                        </Button>
                    </VStack>
                </form>
                <Text>
                    Already have an account? <Link as={RouterLink} to="/login" color="blue.500">Login here</Link>
                </Text>
            </VStack>
        </Box>
    );
};

export default Register;
