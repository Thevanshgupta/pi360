import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { NativeRouter as Router, Route, Routes, Navigate } from 'react-router-native';

import MainScreen from './MainScreen/MainScreen';
import DataEntryMainPage from './DataEntryScreens/DataEntryMainPage';
import LoginScreen from './login/login';
import ProfileScreen from './MainScreen/profileScreen';

const App = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Router>
          <Routes>
            {/* Conditional Routes Based on User Auth */}
            {user ? (
              <Route path="/" element={<ProfileScreen />} />
            ) : (
              <Route path="/" element={<LoginScreen />} />
            )}
            
            {/* Fallback Route */}
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topContent: {
    flex: 2.5,
  },
  bottomContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  mainText: {
    fontSize: 32,
    color: '#000',
  },
  googleOrText: {
    fontSize: 15,
    marginBottom: 10,
    color: '#000',
  },
  googleButton: {
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 34,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '600',
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    marginTop: 12,
    paddingHorizontal: 8,
  },
  inputContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loginButtonStyle: {
    backgroundColor: '#2d96f8',
    borderColor: '#2d96f8',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '80%',
    borderRadius: 8,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 32,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
