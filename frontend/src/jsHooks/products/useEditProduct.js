import { useState } from "react";
import { useAuthContext } from "../useAuthContext";

const useEditProduct = (id, productData) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const editProduct = async (id, productData) => {
    console.log(productData.JSON);
    setLoading(true);
    try {
      return fetch(`http://localhost:5001/products/edit/${id}`, {
        method: "PATCH",
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

  return { product, editProduct, loading, error };
};

export default useEditProduct;
