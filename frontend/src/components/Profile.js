import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Divider,
  Grid,
  GridItem,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [message, setMessage] = useState('');
  const toast = useToast();

  // Define buttonColor using useColorModeValue
  const buttonColor = useColorModeValue('white', 'brand');

  const handleEditClick = () => {
    setMessage('This feature can be implemented by the developer and is left unimplemented in the template.');
    toast({
      title: "Feature Not Implemented",
      description: "This feature can be implemented by the developer.",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  if (!user) {
    return (
      <Container maxW="container.lg" py={10}>
        <Text>Please log in to view your profile.</Text>
      </Container>
    );
  }

  const InfoSection = ({ title, children }) => (
    <Box bg={bgColor} p={6} borderRadius="lg" borderWidth={1} borderColor={borderColor}>
      <Heading size="md" mb={4}>{title}</Heading>
      <VStack align="stretch" spacing={2}>
        {children}
      </VStack>
    </Box>
  );

  const InfoItem = ({ label, value }) => (
    <HStack justify="space-between">
      <Text fontWeight="bold">{label}:</Text>
      <Text>{value}</Text>
    </HStack>
  );

  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading size="xl">User Profile</Heading>
          <Button 
            colorScheme="brand" 
            bg="brand.primary"
            color={buttonColor} 
            onClick={handleEditClick}
          >
            Edit Profile
          </Button>
        </HStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          <GridItem>
            <InfoSection title="Personal Information">
              <InfoItem label="Username" value={user.username} />
              <InfoItem label="Email" value={user.email} />
            </InfoSection>
          </GridItem>

          <GridItem>
            <InfoSection title="Financial Information">
              <InfoItem label="Annual Income" value={`$${user.annualIncome?.toLocaleString() || 0}`} />
              <InfoItem label="Current Savings" value={`$${user.currentSavings?.toLocaleString() || 0}`} />
            </InfoSection>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <InfoSection title="Monthly Expenses">
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {Object.entries(user.monthlyExpenses || {}).map(([category, amount]) => (
                  <InfoItem key={category} label={category.charAt(0).toUpperCase() + category.slice(1)} value={`$${amount?.toLocaleString()}`} />
                ))}
              </Grid>
            </InfoSection>
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 2 }}>
            <InfoSection title="Financial Goals and Risk Tolerance">
              <InfoItem label="Financial Goals" value={user.financialGoals?.join(', ') || 'None set'} />
              <InfoItem label="Risk Tolerance" value={user.riskTolerance?.charAt(0).toUpperCase() + user.riskTolerance?.slice(1) || 'Not set'} />
            </InfoSection>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
};

export default Profile;
