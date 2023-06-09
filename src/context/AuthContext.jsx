import { onUserStateChanged } from "api/firebase";

const { createContext, useEffect, useState, useContext } = require("react");

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    setLoading(true);
    onUserStateChanged((data) => {
      setUser(data);
      setLoading(false)
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, uid: user && user.uid, isUserLoading:loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthApi() {
  return useContext(AuthContext);
}
