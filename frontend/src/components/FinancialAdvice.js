import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFinancialAdvice, selectAdvice } from '../store/financialAdviceSlice';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Select,
  Textarea,
  Button,
  Text,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';

const FinancialAdvice = () => {
  const [question, setQuestion] = useState('');
  const [area, setArea] = useState('general');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [setError] = useState('');
  const { advice, loading, error } = useSelector(selectAdvice);
  const { token } = useSelector((state) => state.auth);
  const toast = useToast();

  // Define buttonColor using useColorModeValue
  const buttonColor = useColorModeValue('white', 'brand');
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      await dispatch(fetchFinancialAdvice({ question, area })).unwrap();
    } catch (err) {
      console.error('Error fetching financial advice:', err);
      setError('We\'re having trouble generating advice right now. Please try again later or contact support if the problem persists.');
  }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={6}>AI-Powered Financial Advice</Heading>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel htmlFor="area">Area of Advice:</FormLabel>
              <Select
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="general">General</option>
                <option value="budgeting">Budgeting</option>
                <option value="investing">Investing</option>
                <option value="debt">Debt Management</option>
                <option value="savings">Savings</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="question">Your Financial Question:</FormLabel>
              <Textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Your Financial Question"
                required
              />
            </FormControl>
            <Button 
              type="submit" 
              colorScheme="brand" // Use the brand color scheme
              bg="brand.primary" // Set background to black
              color={buttonColor} // Set text color based on color mode
              isLoading={loading}
            >
              Get Advice
            </Button>
          </VStack>
        </form>
      </Box>

      {advice && (
        <Box mt={8} p={6} borderRadius="lg" boxShadow="md" bg="white">
          <Heading size="md" mb={4}>Your Personalized Advice</Heading>
          <Box>
            <ReactMarkdown components={{
              h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
              h2: (props) => <Heading as="h2" size="lg" my={3} {...props} />,
              h3: (props) => <Heading as="h3" size="md" my={2} {...props} />,
              p: (props) => <Text mb={3} {...props} />,
              ul: (props) => <Box as="ul" pl={4} mb={3} {...props} />,
              ol: (props) => <Box as="ol" pl={4} mb={3} {...props} />,
              li: (props) => <Box as="li" mb={1} {...props} />,
            }}>
              {advice}
            </ReactMarkdown>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default FinancialAdvice;
