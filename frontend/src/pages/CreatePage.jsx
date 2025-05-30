import { Heading, Input , useColorModeValue} from "@chakra-ui/react"
import { Container, VStack, Box, Button } from "@chakra-ui/react"
import { useState } from "react"
import { usePetStore } from "../store/pet.js"
import { useToast } from "@chakra-ui/react"

const CreatePage = () => {
    const [newPet, setNewPet] = useState({
        name: "",
        type: "",
        breed: "",
        age: "",
        image: "",
    })

const toast = useToast();
const {createPet} = usePetStore();
const handleAddPet = async() => {
    const {success,message}= await createPet(newPet);
    if(!success)
    {
        toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }
    else
    {
        toast({
            title: "Success",
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    }
    setNewPet({
        name: "",
        type: "",
        breed: "",
        age: "",
        image: "",
    });
}

  return (
    <Container maxW="container.sm">
        <VStack
        spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Add Pet</Heading>
            <Box
            w={"full"} bg={useColorModeValue("white", "gray.800")} p={8}
            rounded = {"lg"} shadow = {"md"}
            >
                <VStack spacing={4}>
                    <Input
                    placeholder="Name"
                    name="name"
                    value={newPet.name}
                    onChange={(e) => setNewPet({...newPet, name: e.target.value})}
                    />
                    <Input
                    placeholder="Type"
                    name="type"
                    value={newPet.type}
                    onChange={(e) => setNewPet({...newPet, type: e.target.value})}
                    />
                    <Input
                    placeholder="Breed"
                    name="breed"
                    value={newPet.breed}
                    onChange={(e) => setNewPet({...newPet, breed: e.target.value})}
                    />
                    <Input
                    placeholder="Age"
                    name="age"
                    type="number"
                    value={newPet.age}
                    onChange={(e) => setNewPet({...newPet, age: e.target.value})}
                    />
                    <Input
                    placeholder="Image URL"
                    name="image"
                    value={newPet.image}
                    onChange={(e) => setNewPet({...newPet, image: e.target.value})}
                    />

                    <Button colorScheme={"blue"} w={"full"} onClick={handleAddPet}>Add Pet</Button>
                </VStack>

            </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage