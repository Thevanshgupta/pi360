import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from 'react-native';
import LoginLogic from './logic';



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signinWithGoogle() {

  }

  // Function to handle email/password login
  const handleEmailLogin = async () => {
    return pass
  };

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
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(text) => setEmail(text)}
            />
            <TouchableOpacity style={styles.loginButtonStyle} onPress={handleEmailLogin} >
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

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    height: Dimensions.get('window').height,
  },
  topContent: {
    flex: 2,
  },
  bottomContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mainText: {
    fontSize: 30,
    color: '#000',
  },
  googleOrText: {
    fontSize: 25,
    marginBottom: 20,
    color: '#000',
  },
  googleButton: {
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 34,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButtonText: {
    marginLeft: 16,
    marginRight: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
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
    justifyContent: 'center',
  },
  loginButtonStyle: {
    backgroundColor: "#2d96f8",
    borderColor: "#2d96f8",
    borderWidth: 1,
    borderStyle: "solid",
    width: '80%',
    borderRadius: 8,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 32,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
  ,
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  }
});

export default LoginScreen;
