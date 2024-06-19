import { useEffect, useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from "react-router-dom";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch("http://localhost:5001/user/all", {
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
        setUsers(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate, user]);

  return { users, loading, error };
};

export default useGetUsers;
