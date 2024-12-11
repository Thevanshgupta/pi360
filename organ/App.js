import { View, Text } from 'react-native'
import React from 'react'
import { AuthProvider, useAuth } from './context/AuthContext';
import AppRoutes from './routes';


export default function App() {
  return (
    <AuthProvider>
     <AppRoutes/>
    </AuthProvider>
  )
}