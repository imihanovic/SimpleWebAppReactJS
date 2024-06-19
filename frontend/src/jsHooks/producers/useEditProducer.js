import { useState } from "react";
import { useAuthContext } from "../useAuthContext";

const useEditProducer = (id, producerData) => {
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const editProducer = async (id, producerData) => {
    setLoading(true);
    try {
      return fetch(`http://localhost:5001/producers/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(producerData),
      })
        .then((response) => response.json())
        .then((json) => {
          setProducer(json);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { producer, editProducer, loading, error };
};

export default useEditProducer;
