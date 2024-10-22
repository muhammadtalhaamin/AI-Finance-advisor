import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaChartLine, FaRegLightbulb, FaBullseye, FaRobot } from 'react-icons/fa';

const Feature = ({ title, text, icon, onClick }) => {
  return (
    <Stack
      align={'center'}
      justify={'center'}
      rounded={'xl'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={6}
      cursor="pointer"
      onClick={onClick}
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'xl',
      }}
    >
      <Icon as={icon} w={10} h={10} color={'brand.primary'} />
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'} align={'center'}>{text}</Text>
    </Stack>
  );
};

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const features = [
    {
      title: 'Financial Snapshot',
      text: 'Get a clear picture of your current financial situation.',
      icon: FaChartLine,
      path: '/financial-snapshot',
    },
    {
      title: 'AI-Powered Advice',
      text: 'Receive personalized financial recommendations.',
      icon: FaRegLightbulb,
      path: '/financial-advice',
    },
    {
      title: 'Goal-Based Planning',
      text: 'Set and track your financial goals with AI assistance.',
      icon: FaBullseye,
      path: '/goals',
    },
    {
      title: 'AI Chatbot',
      text: 'Get instant answers to your financial questions.',
      icon: FaRobot,
      path: '/chatbot',
    },
  ];

  return (
    <Box>
      <Container maxW={'5xl'} py={12}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            Welcome, {user.username}!
          </Heading>
          <Text fontSize="lg" color={'gray.500'}>
            Manage your finances and get personalized advice with AI assistance.
          </Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mt={10}>
          {features.map((feature, index) => (
            <Feature
              key={index}
              title={feature.title}
              text={feature.text}
              icon={feature.icon}
              onClick={() => navigate(feature.path)}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}