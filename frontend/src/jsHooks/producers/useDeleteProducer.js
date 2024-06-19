import { useState } from "react";
import { useAuthContext } from "../useAuthContext";

const useDeleteProducer = (id) => {
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const deleteProducer = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/producers/remove/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const json = await response.json();
      setProducer(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { producer, deleteProducer, loading, error };
};

export default useDeleteProducer;
