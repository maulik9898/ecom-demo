import { Badge, Image } from "@mantine/core";
import React from "react";
import useStore from "../store/useStore";

const ProductImage = ({
  image,
  name,
  stock,
}: {
  image: string;
  name: string;
  stock: number;
}) => {
    const layout = useStore((state) => state.layout);
  return (
    <>
      <Image height={layout == "grid" ? 300 : 200} src={image} alt={name} bg={"white"} fit="contain"  />
      {stock && stock < 3 && stock > 0 ? (
        <Badge color="yellow" fullWidth variant="light" radius={"xs"}>
          ⚡️ Only {stock} left in stock
        </Badge>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductImage;
