import React, { forwardRef, useEffect, useState } from "react";
import useStore from "../store/useStore";
import { Flex, Button, Text, Select, Group, Avatar } from "@mantine/core";

import coupons from "../discount.json";
import { notifications } from "@mantine/notifications";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {"Flat " + value + "% off"}
          </Text>
        </div>
      </Group>
    </div>
  )
);

const Checkout = ({ onClose }: { onClose: () => void }) => {
  const cart = useStore((state) => state.cart);
  const [total, setToatal] = useState(0);
  const reset = useStore((state) => state.reset);

  const data = Object.entries(coupons).map((key, value) => {
    return {
      value: key[1].toString(),
      label: key[0],
    };
  });

  const [discount, setDiscount] = useState(0);

  const [selectedCoupon, setSelectedCoupon] = useState<string | null>();
  useEffect(() => {
    const d = total * ((parseInt(selectedCoupon!) || 0) / 100);
    setDiscount(+d.toFixed(2));
  }, [cart, discount, selectedCoupon]);

  useEffect(() => {
    setToatal(cart.reduce((acc, item) => acc + item.quantity * item.price, 0));
  }, [cart]);

  return (
    <Flex w={"100%"} justify={"space-between"} align={"center"} gap={"md"}>
      <Flex
        gap={"md"}
        justify={"space-between"}
        direction={"column"}
        align={"start"}
        m={"xs"}
      >
        <Select
          maw={300}
          allowDeselect
          mt={"xs"}
          label="Apply Coupon"
          itemComponent={SelectItem}
          onChange={setSelectedCoupon}
          ml={"xs"}
          mr={"xs"}
          value={selectedCoupon}
          data={data}
        />

        {selectedCoupon && (
          <Text ml={"xs"} weight={"bold"} color={"green"}>
            {selectedCoupon}% off
          </Text>
        )}
      </Flex>
      <Flex gap={"md"} justify={""} align={"start"} m={"xs"}>
        <Flex direction={"column"} align={"start"}>
          <Text weight={"bold"}>Subtotal</Text>
          <Text weight={"bold"}>Discount</Text>
          <Text weight={"bold"}>Total</Text>
        </Flex>
        <Flex direction={"column"} align={"start"}>
          <Text>${total}</Text>
          <Text>${discount}</Text>
          <Text>{(total - discount).toFixed(2)}$</Text>
        </Flex>
      </Flex>
      <Button
        onClick={() => {
          notifications.show({
            title: "Order Placed",
            message: "Your order has been placed successfully",
          });

          reset();
          onClose();
        }}
        maw={200}
        fullWidth
        variant="filled"
        color="blue"
        radius="md"
      >
        Checkout
      </Button>
    </Flex>
  );
};

export default Checkout;
