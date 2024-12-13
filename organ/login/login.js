import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, user,userData,setUserData } = useAuth();
  // Function to handle email/password login
  const handleEmailLogin = async () => {
      const result = await LoginLogic(email, password,navigate,login,setUserData);
  };

  // Function to handle Google login (dummy implementation)
  const signinWithGoogle = async () => {
    Alert.alert('Feature Not Implemented', 'Google login will be added soon.');
  };
  if (user){
    navigate("/home")
  }


  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.loginText}>
          <Text style={styles.mainText}>Login To PI360</Text>
        </View>
        <View style={styles.inputContent}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            style={styles.loginButtonStyle}
            onPress={handleEmailLogin}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Text style={styles.googleOrText}>or login using</Text>
        <TouchableOpacity style={styles.googleButton} onPress={signinWithGoogle}>
          <Image
            style={styles.googleIcon}
            source={{
              uri: 'https://i.ibb.co/j82DCcR/search.png',
            }}
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Logic for API calls
const LoginLogic = async (username, password,navigate,login,setUserData) => {
  try {
    const response = await axios.post(
      'https://pi360.net/site/api/api_login_user.php?institute_id=mietjammu',
      {
        username_1: username, //karan.cse@mietjammu.in
        password_1: password, //22803205 access token refresh token
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.statusCode === 200) {
      Toast.show('Login Successful');
      await AsyncStorage.setItem("authToken",response.data.token)
      login(true);
      setUserData(response.data.data)
      console.log('Login Successful:', response.data.message);
      console.log('Token:', response.data.token); // Using token from response
      navigate('/')
      return response.data;
    } else {
      throw new Error(response.data.message || 'Login failed.');
    }
  } catch (error) {
    Toast.show('invalid credentials');
    console.log(error)
    
  }
};

// Styles
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff', // Light background
  },
  topContent: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#87cefa', // Light blue gradient background
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  bottomContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  mainText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  googleOrText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  googleButtonText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
  input: {
    width: '85%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonStyle: {
    backgroundColor: '#1e90ff',
    width: '85%',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default LoginScreen;
