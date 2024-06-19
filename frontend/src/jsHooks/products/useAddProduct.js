import { useState } from "react";
import { useAuthContext } from "../useAuthContext";

const useAddProduct = (productData) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const addProduct = async (productData) => {
    setLoading(true);
    try {
      return fetch(`http://localhost:5001/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(productData),
      })
        .then((response) => response.json())
        .then((json) => {
          setProduct(json);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { product, addProduct, loading, error };
};

export default useAddProduct;
