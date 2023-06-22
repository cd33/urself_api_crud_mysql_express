import { useState } from "react";

interface Token {
  token: string;
}

const useToken = () => {
  const getToken = () => {
    const tokenString: string | null = localStorage.getItem("token");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken.token;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: Token) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
