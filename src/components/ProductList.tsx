import {
  Center,
  Flex,
  Grid,
  Group,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import React, { useEffect } from "react";
import CartButton from "./CartButton";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react";
import useStore from "../store/useStore";
import ProductHeader from "./Header";
import ProductCard from "./ProductCard";
import Product from "./Product";
import ProductTable from "./ProductTable";

const ProductList = () => {
  const [products, inventory, layout] = useStore((state) => [
    state.products,
    state.inventory,
    state.layout,
  ]);

  const sortedProducts = products.sort((a, b) => {
    return a.id - b.id;
  });
  const sortedInventory = inventory.sort((a, b) => {
    return a.id - b.id;
  });

  return (
    <Flex direction="column" m={"xl"} style={{ height: "100vh" }}>
      <ProductHeader />
      {layout === "grid" ? (
        <Grid gutter={"xl"} mt={"md"} align="stretch">
          {sortedProducts.map((product, index) => {
            return (
              <Grid.Col key={product.id} sm={6} md={4} lg={3}>
                <Product inventory={sortedInventory[index]} product={product} />
              </Grid.Col>
            );
          })}
        </Grid>
      ) : (
        <Stack >
          {sortedProducts.map((product, index) => {
            return (
              <Product inventory={sortedInventory[index]} product={product} />
            );
          })}
        </Stack>
      )}
    </Flex>
  );
};

export default ProductList;
