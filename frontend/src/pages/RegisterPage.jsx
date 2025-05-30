import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({ title: 'Registration successful.', status: 'success', duration: 3000, isClosable: true });
        navigate('/login'); // redirect to login page after success
      } else {
        toast({ title: data.message || 'Registration failed.', status: 'error', duration: 3000, isClosable: true });
      }
    } catch (err) {
      toast({ title: 'Something went wrong.', status: 'error', duration: 3000, isClosable: true });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} bg="white" borderRadius="md" boxShadow="md">
      <Heading mb={6} textAlign="center">Register</Heading>
      <form onSubmit={handleRegister}>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl mb={6} isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" type="submit" width="full">Register</Button>
      </form>
      <Text mt={4} textAlign="center">
        Already have an account? <Button variant="link" colorScheme="blue" onClick={() => navigate('/login')}>Login here</Button>
      </Text>
    </Box>
  );
};

export default RegisterPage;
