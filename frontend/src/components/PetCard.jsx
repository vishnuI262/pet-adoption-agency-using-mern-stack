import { Box, Button, Image, Input, ModalCloseButton, ModalContent } from '@chakra-ui/react'
import { Heading, HStack, IconButton, Text } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useColorModeValue } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { usePetStore } from '../store/pet'
import { useDisclosure } from '@chakra-ui/react'
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react'

const PetCard = ({pet}) => {
    const [updatedPet, setUpdatedPet] = useState(pet);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const {deletePet, updatePet} = usePetStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleDeletePet = async (pid) => {
        const {success, message} = await deletePet(pid);
        if(!success) return toast({title : "Error", description : message, status : "error", duration : 5000, isClosable : true});
        else
        {
            toast({title : "Success", description : message, status : "success", duration : 5000, isClosable : true});
        }
    };


    const handleUpdatePet = async (pid, updatedPet) => {
        const {success, message} = await updatePet(pid, updatedPet);
        if(!success) return toast({title : "Error", description : message, status : "error", duration : 5000, isClosable : true});
        else
        {
            toast({title : "Success", description : message, status : "success", duration : 5000, isClosable : true});
        }
        onClose();
    }
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    bg = {bg}
    >
      <Image src = {pet.image} alt = {pet.name} h={48} w="full" objectFit = "cover" />

    <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
            {pet.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color = {textColor} mb={4}>
            {"Category : " +pet.type}<br />
            {"Breed : " +pet.breed}<br />
            {"Age : " +pet.age}

        </Text>

        <HStack spacing={2}>
            <IconButton icon={<EditIcon />} onClick = {onOpen} colorScheme="blue" />
            <IconButton icon={<DeleteIcon />} onClick={() => handleDeletePet(pet._id)} colorScheme="red" />
        </HStack>

    </Box>

    <Modal isOpen={isOpen} onClose={onClose}>

    <ModalOverlay />
    <ModalContent>
        <ModalHeader>Update Pet Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <VStack spacing={4}>
                <Input
                placeholder = "Pet Name"
                name = "name"
                value={updatedPet.name}
                onChange={(e) => setUpdatedPet({...updatedPet, name : e.target.value})} 
                />
                <Input
                placeholder = "Pet Type"
                name = "type"
                value={updatedPet.type}
                onChange={(e) => setUpdatedPet({...updatedPet, type : e.target.value})}
                />
                <Input
                placeholder = "Pet Breed"
                name = "breed"
                value={updatedPet.breed}
                onChange={(e) => setUpdatedPet({...updatedPet, breed : e.target.value})}
                />
                <Input
                placeholder = "Pet Age"
                name = "age"
                value={updatedPet.age}
                onChange={(e) => setUpdatedPet({...updatedPet, age : e.target.value})}
                />
                <Input
                placeholder = "Pet Image URL"
                name = "image"
                value={updatedPet.image}
                onChange={(e) => setUpdatedPet({...updatedPet, image : e.target.value})}
                />
            </VStack>
        </ModalBody>
        <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={()=>handleUpdatePet(pet._id, updatedPet)} >
                Update
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
    </ModalContent>

    </Modal>
        
    </Box>
  )
};

export default PetCard;