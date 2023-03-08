import { Card, Flex, Transition } from "@mantine/core";
import React, { useEffect } from "react";
import { Inventory, Product } from "../types";
import AddToCart from "./AddToCart";
import ProductDetail from "./ProductDetail";
import ProductImage from "./ProductImage";
import ProductCard from "./ProductCard";
import ProductTable from "./ProductTable";
import useStore from "../store/useStore";

const Product = ({
  product,
  inventory,
}: {
  product: Product;
  inventory: Inventory;
}) => {
  const layout = useStore((state) => state.layout);
  const [selectedVariant, setSelectedVariant] = React.useState<string | null>(
    product.variants[0].id.toString()
  );

  const [stock, setStock] = React.useState<number | undefined>();
  useEffect(() => {
    const stock = inventory?.variants.find(
      (value) => value.id == parseInt(selectedVariant!)
    )?.stock;
    setStock(stock);
  }, [selectedVariant, inventory]);

  const [price, setPrice] = React.useState<number | undefined>();
  useEffect(() => {
    const price = product?.variants.find(
      (value) => value.id == parseInt(selectedVariant!)
    )?.price;
    setPrice(price);
  }, [selectedVariant, product]);
  const [limit, setLimit] = React.useState<number | undefined>();
  useEffect(() => {
    const limit = product?.variants.find(
      (value) => value.id == parseInt(selectedVariant!)
    )?.limit;
    setLimit(limit);
  }, [selectedVariant, product]);

  const data = product?.variants.map((variant) => {
    return {
      value: variant.id.toString(),
      label: variant.name,
    };
  });

  return (
    <>
      {layout === "grid" ? (
        <ProductCard
          product={product}
          price={price!}
          data={data!}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          stock={stock!}
          limit={limit!}
        />
      ) : (
        <ProductTable
          product={product}
          price={price!}
          data={data!}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          stock={stock!}
          limit={limit!}
        />
      )}
    </>
  );
};

export default Product;
