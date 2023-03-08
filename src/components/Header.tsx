import { Flex, SegmentedControl, Center, Text } from "@mantine/core";
import { IconLayoutGrid, IconLayoutList } from "@tabler/icons-react";
import React, { useEffect } from "react";
import CartButton from "./CartButton";
import useStore from "../store/useStore";

const Header = () => {
  const { layout, setLayout} = useStore((state) => ({
    layout: state.layout,
    setLayout: state.setLayout,
  }));

  useEffect(() => {
    console.log(layout);
  }, [layout]);
  return (
    <Flex justify={"space-between"}>
      <Text weight={"bolder"} size="xl">
        Products
      </Text>

      <SegmentedControl
        value={layout}
        onChange={(value) => setLayout(value)}
        data={[
          {
            value: "grid",
            label: (
              <Center>
                <IconLayoutGrid size="1rem" />
              </Center>
            ),
          },
          {
            value: "table",
            label: (
              <Center>
                <IconLayoutList size="1rem" />
              </Center>
            ),
          },
        ]}
      />
      <CartButton />
    </Flex>
  );
};

export default Header;
