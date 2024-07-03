"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { Client, Account } from "appwrite";

const AppwriteContext = createContext();

export const AppwriteProvider = ({ children }) => {
  const client = useMemo(
    () =>
      new Client()
        .setEndpoint("https://cloud.appwrite.io/v1") // Your Appwrite API Endpoint
        .setProject("668574090033e660a227"),
    []
  ); // Your Appwrite Project ID

  const account = useMemo(() => new Account(client), [client]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if there's an existing session when the context is mounted
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.error("No session found", error);
      }
    };
    checkSession();
  }, [account]);

  return (
    <AppwriteContext.Provider value={{ client, account, user, setUser }}>
      {children}
    </AppwriteContext.Provider>
  );
};

export const useAppwrite = () => useContext(AppwriteContext);
