import { useState } from "react";
import { useAuthContext } from "../useAuthContext";

const useEditUser = (id, userData) => {
  const [fetchedUser, setFetchedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const editUser = async (id, userData) => {
    setLoading(true);
    try {
      console.log("UPDATE USER",JSON.stringify(userData));
      return fetch(`http://localhost:5001/user/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((json) => {
          setFetchedUser(json);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { fetchedUser, editUser, loading, error };
};

export default useEditUser;
