import React from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  Container,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";
import { AddIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { products } = useProductStore();
  return (
    <Container maxW="container.lg" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Left side: Logo */}
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r,cyan.400,blue.500)"}
          bgClip={"text"}
        >
          <Link href="/">Product Store</Link>
        </Text>

        {/* Right side: Sign Up button with plus icon */}
        <div>
          <Link href="/create" px={3}>
            <Button fontSize={20}>
              <AddIcon />
            </Button>
          </Link>

          <Button fontSize={20} onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun fontSize={20} />}
          </Button>
        </div>
      </Flex>
    </Container>
  );
};

export default Navbar;
