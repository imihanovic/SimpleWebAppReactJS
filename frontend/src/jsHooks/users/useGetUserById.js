import { useEffect, useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from "react-router-dom";

const useGetUserById = (id) => {
  const [fetchedUser, setFetchedUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:5001/user/get/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        setFetchedUser(json);
      } catch (error) {
        console.log("error", error);
        setError(error);
        if (error.message === "Not authorized") {
          console.log("not authorized");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate, user.token]);

  return { fetchedUser, loading, error };
};

export default useGetUserById;
