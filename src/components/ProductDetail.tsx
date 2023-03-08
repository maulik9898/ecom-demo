import { Flex, Select, SelectItem, Text } from "@mantine/core";
import React from "react";
import { Product } from "../types";

const ProductDetail = ({
  product,
  price,
  data,
  selectedVariant,
  setSelectedVariant,
}: {
  product: Product;
  price: number;
  data: readonly (string | SelectItem)[];
  selectedVariant: string | null;
  setSelectedVariant: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <Flex direction={"column"}  justify={"flex-start"}>
      <Flex justify={"space-between"}>
        <Text m={"xs"} weight={500}>
          {product.name}
        </Text>

        <Text m={"xs"} color="green" weight={500}>
          {price}$
        </Text>
      </Flex>

      <Text m={"xs"} lineClamp={2} size="sm" color="dimmed">
        {product.description}
      </Text>

      <Select
        maw={300}
        disabled={product.variants.length == 1}
        mt={"xs"}
        onChange={setSelectedVariant}
        ml={"xs"}
        mr={"xs"}
        value={selectedVariant}
        data={data}
      />
    </Flex>
  );
};

export default ProductDetail;
