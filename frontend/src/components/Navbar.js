import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Box, Flex, Heading, Button, HStack, useColorModeValue } from '@chakra-ui/react';

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box w="100%">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4, md: 60 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'center'}
        w="100%"
      >
        <Flex flex={1}></Flex>

        <Heading 
          as={RouterLink}
          to={user ? '/' : '/'}
          textAlign={'center'}
          fontSize={'2xl'} 
          fontFamily={'heading'}
          color={useColorModeValue('gray.800', 'white')}
          fontWeight={'bold'}
        >
          AI Finance Advisor
        </Heading>

        <HStack spacing={8} flex={1} justify="flex-end">
          {user ? ( 
            <>
              <Button
                as={RouterLink}
                to="/profile"
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
              >
                Profile
              </Button>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'brand.primary'}
                onClick={handleLogout}
                _hover={{
                  bg: 'gray.700',
                }}
              >
                Logout
              </Button>
            </>
          ) : ( 
            <>
              <Button
                as={RouterLink}
                to="/login"
                fontSize={'sm'}
                fontWeight={400}
                variant={'link'}
              >
                Sign In
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'brand.primary'}
                _hover={{
                  bg: 'gray.700',
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}
