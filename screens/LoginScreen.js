import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors } from "../styles/theme";
import { auth } from "../Firebase/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  // Login
  const handleLogin = () => {
    if (!email || !password) return Alert.alert("Error", "Completa los campos");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("Home"); 
      })
      .catch((error) => {
        Alert.alert("Login failed", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NoTube</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Nuevo botón: solo navega a la pantalla de registro */}
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: "#7c3aed" }]} 
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    padding: 30
  },
  title: {
    color: colors.white,
    fontSize: 36,
    textAlign: "center",
    marginBottom: 40
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10
  },
  button: {
    backgroundColor: "#4A148C",
    padding: 15,
    borderRadius: 20,
    marginTop: 20
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18
  }
});