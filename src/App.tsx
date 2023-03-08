import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import { Flex } from "@mantine/core";

import useStore from "./store/useStore";
import { Inventory } from "./types";

function App() {
  const loadData = useStore((state) => state.loadData);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Flex direction="column" m={"xl"} style={{ height: "100vh" }}>
      <ProductList />
    </Flex>
  );
}

export default App;
