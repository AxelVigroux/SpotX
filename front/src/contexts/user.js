import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "Etienne" });
  const [foo, setFoo] = useState("bar");

  return (
    <UserContext.Provider value={{ user, setUser, foo, setFoo }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

export { useUserContext };
export default UserProvider;
