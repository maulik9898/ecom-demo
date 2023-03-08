import { ActionIcon, Alert, Badge, Button, Flex } from "@mantine/core";
import React from "react";
import useStore from "../store/useStore";
import {
  IconAdjustments,
  IconAlertCircle,
  IconMinus,
  IconPlus,
  IconShoppingCartPlus,
} from "@tabler/icons-react";

const AddToCart = ({
  stock,
  productId,
  variantId,
  limit,
}: {
  stock: number;
  productId: number;
  variantId: number;
  limit: number;
}) => {
  const { addToCart, removeFromCart } = useStore();
  const quantity = useStore(
    (state) =>
      state.cart.filter(
        (item) => item.variantId == variantId && item.id == productId
      )[0]?.quantity
  );
  const showAddtoCart =
    (quantity == undefined || quantity == 0) && stock != undefined && stock > 0;
  const showRemove = quantity != undefined && quantity > 0;
  const showAdd =
    quantity != undefined && quantity < limit && stock > 0 && quantity > 0;
  const showOutOfStock =
    stock != undefined &&
    stock == 0 &&
    (quantity == undefined || quantity == 0);

  const limitReached = quantity != undefined && quantity == limit;

  console.log(
    "productid",
    productId,
    "stock",
    stock,
    "quantity",
    quantity,
    "showAddtoCart",
    showAddtoCart,
    "showRemove",
    showRemove,
    "showAdd",
    showAdd,
    "showOutOfStock",
    showOutOfStock
  );

  return (
    <Flex direction={"column"} w={"100%"} miw={200}>
      {showOutOfStock && (
        <Button
          mb={"xs"}
          ml={"xs"}
          mr={"xs"}
          variant="filled"
          disabled
          color="blue"
          radius="md"
        >
          Out of stock
        </Button>
      )}
      {showAddtoCart && (
        <Button
          mb={"xs"}
          ml={"xs"}
          mr={"xs"}
          variant="filled"
          color="blue"
          radius="md"
          leftIcon={<IconShoppingCartPlus size={"1.125rem"} />}
          onClick={() => addToCart(variantId, productId)}
        >
          Add to cart
        </Button>
      )}

      {(showAdd || showRemove) && (
        <Flex align={"center"} gap={"xl"} justify={"space-evenly"}>
          <ActionIcon
            size={"xl"}
            mb={"xs"}
            variant="outline"
            color="blue"
            disabled={!showRemove}
            onClick={() => removeFromCart(variantId, productId)}
          >
            <IconMinus size="1.125rem" />
          </ActionIcon>

          <p>{quantity}</p>
          <ActionIcon
            size={"xl"}
            mb={"xs"}
            variant="outline"
            color="blue"
            disabled={!showAdd}
            onClick={() => addToCart(variantId, productId)}
          >
            <IconPlus size="1.125rem" />
          </ActionIcon>
        </Flex>
      )}
      {limitReached && (
        <Badge p={"xs"} variant="light" radius={"xs"} color="red">
          Order limit reached
        </Badge>
      )}
    </Flex>
  );
};

export default AddToCart;
