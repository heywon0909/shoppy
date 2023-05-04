import { onUserStateChanged } from "api/firebase";

const { createContext, useEffect, useState, useContext } = require("react");

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChanged((data) => setUser(data));
  }, []);
  return (
    <AuthContext.Provider value={{ user, uid: user && user.uid }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthApi() {
  return useContext(AuthContext);
}
