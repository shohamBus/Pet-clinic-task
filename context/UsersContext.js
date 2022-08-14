import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
const UsersContext = React.createContext();

export function useClinic() {
  return useContext(UsersContext);
}

export default function ContextProvider({ children }) {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    axios.get("/api/patient").then((res) => setPatients(res.data));
  }, []);

  return (
    <UsersContext.Provider value={{ patients, setPatients }}>
      {children}
    </UsersContext.Provider>
  );
}
