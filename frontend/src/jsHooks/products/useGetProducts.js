import { useEffect, useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from "react-router-dom";

const useGetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch("http://localhost:5001/products/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error(response.status);
        }
        const json = await response.json();
        setProducts(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [navigate, user]);

  return { products, loading, error };
};

export default useGetProducts;
