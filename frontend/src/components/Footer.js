import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" width="100%" bg="gray.100" py={4}>
      <Flex maxWidth="1200px" margin="0 auto" justify="space-between" align="center" px={4}>
        <Text>&copy; 2024 AI Finance Advisor. All rights reserved.</Text>
        <Flex>
          <Link as={RouterLink} to="/about" mr={4}>About Us</Link>
          <Link as={RouterLink} to="/contact" mr={4}>Contact</Link>
          <Link as={RouterLink} to="/privacy">Privacy Policy</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;