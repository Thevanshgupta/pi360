import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-native';

// Create the Auth Context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData,setUserData] = useState({})
  
  const login = (userData) => {
    setUser(userData); // Set user data after login
  };

  const logout = () => {
    setUser(false); // Clear user data on logout
  };


  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          // Optionally decode or verify the token
         // Replace with actual token decoding logic
          setUser(true);
           // Navigate to the main app
        } else {
          setUser(false);
         
        }
      } catch (error) {
        console.error('Error reading auth token', error);
        setUser(null);
        navigation.navigate('Login');
      }
    };

    checkAuthToken();
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout,userData,setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);