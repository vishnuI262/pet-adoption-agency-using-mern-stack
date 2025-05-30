import { HStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Button, Container, Flex, Text } from "@chakra-ui/react"
import { PlusSquareIcon } from "@chakra-ui/icons"
import { useColorMode } from "@chakra-ui/react"
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { usePetStore } from "../store/pet" // ✅ import Zustand store
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const token = usePetStore((state) => state.token); // ✅ Get token
  const navigate = useNavigate();
  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to={"/"}>Pet Adoption Agency</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          {/* ✅ Only show Add Pet if token exists */}
          {token && (
            <Link to={"/create"}>
              <Button>
                <PlusSquareIcon fontSize={20} />
              </Button>
            </Link>
          )}

          {/* Show login/register if NOT logged in */}
          {!token && (
            <>
              <Link to={"/login"}>
                <Button variant="ghost" colorScheme="blue" size="sm">
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button colorScheme="teal" size="sm">
                  Register
                </Button>
              </Link>
            </>
          )}

          {/* Show logout if logged in */}
          {token && (
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => {
                usePetStore.getState().setToken(null);
                navigate('/login');
              }}
            >
              Logout
            </Button>
          )}

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
