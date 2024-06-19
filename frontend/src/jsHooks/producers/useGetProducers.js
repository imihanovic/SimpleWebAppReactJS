import { useEffect, useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from "react-router-dom";

const useGetProducers = () => {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducers = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch("http://localhost:5001/producers/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        setProducers(json);
      } catch (error) {
        console.log("error", error);
        setError(error);
        if (error.message === "Not authorized") {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducers();
  }, [user, navigate]);

  return { producers, loading, error };
};

export default useGetProducers;
