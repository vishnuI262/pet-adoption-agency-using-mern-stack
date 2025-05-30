import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { usePetStore } from '../store/pet';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const setToken = usePetStore((state) => state.setToken);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        toast({ title: 'Login successful.', status: 'success', duration: 3000, isClosable: true });
        navigate('/'); 
      } else {
        toast({ title: data.message || 'Login failed.', status: 'error', duration: 3000, isClosable: true });
      }
    } catch (err) {
      toast({ title: 'Something went wrong.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading mb={6} textAlign="center">Login</Heading>
      <form onSubmit={handleLogin}>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl mb={6} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" type="submit" width="full">Login</Button>
      </form>
      <Text mt={4} textAlign="center">
        Don't have an account? <Button variant="link" colorScheme="blue" onClick={() => navigate('/register')}>Register here</Button>
      </Text>
    </Box>
  );
};

export default LoginPage;
