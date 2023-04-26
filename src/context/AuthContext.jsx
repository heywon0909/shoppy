import { onUserStateChanged, signWithGoogle } from "api/firebase";

const { createContext, useEffect, useState, useContext } = require("react");

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    // const isTrue = Object.keys(sessionStorage).find((key) =>
    //   key.includes("pendingRedirect")
    // );
    // if (isTrue) {
    //   signWithGoogle();
    // }

    onUserStateChanged((data) => {
      setUser(data);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthApi() {
  return useContext(AuthContext);
}