import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Inventory, Product } from "../types";
import { shallow } from "zustand/shallow";

import {
  Card,
  Group,
  Badge,
  Button,
  Image,
  Text,
  Flex,
  Center,
  Select,
  SelectItem,
} from "@mantine/core";
import useStore from "../store/useStore";
import AddToCart from "./AddToCart";
import ProductImage from "./ProductImage";
import ProductDetail from "./ProductDetail";

const ProductCard = ({
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
  return (
    <Card h={"100%"} p={0} shadow="sm" radius="md" withBorder>
      <Flex
        m={0}
        h={"100%"}
        direction={"column"}
        justify={"space-between"}
        mb={"xs"}
      >
        <Flex m={0} h={"100%"} direction={"column"} mb={"xs"}>
          <ProductImage
            image={product.image}
            name={product.name}
            stock={stock!}
          />
          <ProductDetail
            product={product}
            price={price!}
            data={data!}
            selectedVariant={selectedVariant}
            setSelectedVariant={setSelectedVariant}
          />
        </Flex>

        <AddToCart
          stock={stock!}
          limit={limit!}
          productId={product.id}
          variantId={parseInt(selectedVariant!)}
        />
      </Flex>
    </Card>
  );
};

export default ProductCard;
