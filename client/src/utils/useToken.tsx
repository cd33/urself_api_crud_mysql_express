import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const tokenString: string | null = localStorage.getItem("token");
    if (tokenString) {
      if (Date.now() < JSON.parse(atob(tokenString.split(".")[1])).exp * 1000) {
        return JSON.parse(tokenString);
      }
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string | undefined) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
