import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      primary: '#000000', // Black
      secondary: '#FFFFFF', // White
      warning: '#ffc107',
      error: '#dc3545',
      success: '#28a745',
    },
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Roboto, sans-serif',
  },
});

export default theme;