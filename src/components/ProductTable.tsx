import React from "react";
import { Product } from "../types";
import { Box, Flex, SelectItem } from "@mantine/core";
import ProductImage from "./ProductImage";
import ProductDetail from "./ProductDetail";
import AddToCart from "./AddToCart";
import { useMediaQuery } from "@mantine/hooks";

const ProductTable = ({
  product,
  price,
  data,
  selectedVariant,
  setSelectedVariant,
  stock,
  limit,
}: {
  product: Product;
  price: number;
  data: readonly (string | SelectItem)[];
  selectedVariant: string | null;
  setSelectedVariant: React.Dispatch<React.SetStateAction<string | null>>;
  stock: number;
  limit: number;
}) => {
  const matches = useMediaQuery("(max-width: 56.25em)");
  return (
    <Flex wrap={"wrap"} gap={"md"} w={"100%"} p={"xs"} align={"center"} >
      <Flex
        w={matches ? 100 : 200}
        direction={"column"}
        justify={"center"}
        align={"center"}
      >
        <ProductImage
          image={product.image}
          name={product.name}
          stock={stock!}
        />
      </Flex>
     
        <ProductDetail
          product={product}
          price={price!}
          data={data!}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
        />
        <Box style={{marginLeft: "auto"}}>
          <AddToCart
            stock={stock!}
            limit={limit!}
            productId={product.id}
            variantId={parseInt(selectedVariant!)}
          />
        </Box>
      
    </Flex>
  );
};

export default ProductTable;
