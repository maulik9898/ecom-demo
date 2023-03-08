import React from "react";
import { CartItem } from "../types";
import { Flex, Image, Text } from "@mantine/core";
import AddToCart from "./AddToCart";
import useStore from "../store/useStore";

const CartItem = ({ item }: { item: CartItem }) => {
  const inventory = useStore((state) =>
    state.inventory
      .find((value) => value.id == item.id)
      ?.variants.find((value) => value.id == item.variantId)
  );
  const limit = useStore(
    (state) =>
      state.products
        .find((value) => value.id == item.id)
        ?.variants.find((value) => value.id == item.variantId)?.limit
  );
  return (
    <Flex  w={"100%"} gap={"xl"} align={"center"} m={"xs"}>
      <Image width={100} height={100} src={item.image} alt={item.name} fit="contain" />
      <Flex direction={"column"} >
        <h3>{item.name}</h3>
        <p>{item.variantName}</p>
      </Flex>
      <Flex ml={"auto"} gap={"md"} direction={"column"} justify={"center"} align={"center"}>
        <Text fz={"md"} color="white" weight={"bold"} >
          {item.quantity} x {item.price}$ = {item.quantity * item.price}$
        </Text>
        <AddToCart
          stock={inventory?.stock!}
          limit={limit!}
          productId={item.id}
          variantId={item.variantId}
        />
      </Flex>
    </Flex>
  );
};

export default CartItem;
