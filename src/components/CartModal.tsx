import { Button, Flex, Stack, Text } from "@mantine/core";

import useStore from "../store/useStore";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import Checkout from "./Checkout";

const CartModal = ({ onClose }: { onClose: () => void }) => {
  const cart = useStore((state) => state.cart);
  const [total, setToatal] = useState(0);

  useEffect(() => {
    setToatal(cart.reduce((acc, item) => acc + item.quantity * item.price, 0));
  }, [cart]);

  return (
    <Stack justify={"space-between"} align={"center"} m={"xl"}>
      {cart.map((item) => {
        return <CartItem item={item} />;
      })}

      <Checkout onClose={onClose}  />
    </Stack>
  );
};

export default CartModal;
