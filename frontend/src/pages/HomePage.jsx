import { Container, VStack, Text, Box, Flex, Icon } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { useEffect } from 'react';
import { SimpleGrid } from '@chakra-ui/react'
import { usePetStore } from '../store/pet'
import PetCard from '../components/PetCard'

const HomePage = () => {
  const navigate = useNavigate();
  const { fetchPets, pets } = usePetStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchPets();
  }, [fetchPets]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text 
          fontSize={"30"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Pets Available
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </SimpleGrid>

        {pets.length === 0 && (
          <>
            <Text fontSize='xl' textAlign="center" fontWeight='bold' color='gray.500'>
              Oops! No pets available right now 🐾
            </Text>
            <Link to="/create">
              <Flex
                as="button"
                align="center"
                gap={2}
                px={4}
                py={2}
                bg="blue.500"
                color="white"
                fontWeight="bold"
                borderRadius="md"
                _hover={{ bg: "blue.600" }}
              >
                <Icon as={FaPlus} />
                Add Pet
              </Flex>
            </Link>
          </>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage;
