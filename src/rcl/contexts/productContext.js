import { createContext } from "react";

const ProductContext = createContext({
  product: null,
  setProduct: () => {},
});

export default ProductContext;
