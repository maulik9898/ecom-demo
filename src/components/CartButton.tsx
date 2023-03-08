import { Button, Indicator, Modal } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import React, { useEffect } from "react";
import useStore from "../store/useStore";
import { shallow } from "zustand/shallow";

import { useDisclosure } from "@mantine/hooks";
import CartModal from "./CartModal";

const CartButton = () => {
  const cart = useStore(
    (state) => state.cart.reduce((acc, item) => acc + item.quantity, 0),
    shallow
  );

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal size={"80%"} opened={opened} onClose={close} centered >
        <CartModal onClose={close} />
      </Modal>
      <Indicator color="red" inline label={cart} size={16}>
        <Button onClick={open} leftIcon={<IconShoppingCart size="1.2rem" />}>
          Cart
        </Button>
      </Indicator>
    </>
  );
};

export default CartButton;
