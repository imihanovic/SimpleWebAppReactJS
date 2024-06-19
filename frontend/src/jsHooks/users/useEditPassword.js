import { useState } from "react";
import { useAuthContext } from "../useAuthContext";

const useUpdatePassword = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const updatePassword = async (id, currentPassword, newPassword) => {
    try {
      
      const response = await fetch(
        `http://localhost:5001/user/editPassword/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    } catch (error) {
      setError(error);
    }
  };

  return { updatePassword, error };
};

export default useUpdatePassword;
