import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const register = async (
    email,
    password,
    confirmPassword,
    role
  ) => {
    setError(null);

    const response = await fetch("http://localhost:5001/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        role,
      }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      navigate("/login");
    }
  };

  return { register, response: { error } };
};
