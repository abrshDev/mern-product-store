import React, { useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  VStack,
  Input,
  ModalFooter,
} from "@chakra-ui/react";

import { useProductStore } from "../store/product";

function ProductCard({ product }) {
  const [updateProduct, setUpdateProduct] = useState(product);
  console.log(updateProduct);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const { deleteProducts, updateProducts } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    // console.log(pid);
    const { success, message } = await deleteProducts(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
        duration: "3000",
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
        duration: "3000",
      });
    }
  };
  // const [forceUpdate, setForceUpdate] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleUpdateProduct = async (pid, updateProduct) => {
    setLoading(true); // Start loading
    try {
      console.log(pid);
      const { success, message } = await updateProducts(pid, updateProduct);
      toast({
        title: "Product Updated",
        status: message,
        isClosable: true,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error updating product",
        description: error.message,
        status: message,
        isClosable: true,
        duration: 3000,
      });
    } finally {
      setLoading(false); // End loading after the update is done

      onClose();
      setForceUpdate((prev) => prev + 1);
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        w="full"
        objectFit={"cover"}
        h={48}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          ${product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize="xl" color={textColor} mb={4}>
          {product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <Input
                placeholder="product name"
                name="name"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="price"
                name="price"
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="url"
                name="image"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updateProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ProductCard;
