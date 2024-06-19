import { useState } from "react";
import { useAuthContext } from "../useAuthContext";

const useDeleteProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      return fetch(`http://localhost:5001/products/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
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

  return { product, deleteProduct, loading, error };
};

export default useDeleteProduct;
