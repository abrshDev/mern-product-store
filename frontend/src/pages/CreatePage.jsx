import {
  Container,
  Box,
  Heading,
  VStack,
  Input,
  useColorModeValue,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useProductStore } from "../store/product";
import { useState } from "react";
function CreatePage() {
  const [newProduct, SetNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const toast = useToast();
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    SetNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as="h1" size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                SetNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="product price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                SetNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="product image"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                SetNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button onClick={handleAddProduct} w={"full"} colorScheme="blue">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
