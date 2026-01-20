import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { colors } from "../styles/theme";
import { auth } from "../Firebase/firebase"; // tu archivo firebase.js
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  const handleRegister = () => {
    if (!username || !email || !pass1 || !pass2) {
      return Alert.alert("Error", "Completa todos los campos");
    }

    if (pass1 !== pass2) {
      return Alert.alert("Error", "Las contraseñas no coinciden");
    }

    // Crear usuario en Firebase Auth
    createUserWithEmailAndPassword(auth, email, pass1)
      .then((userCredential) => {
        // Actualizar el displayName con el username
        updateProfile(userCredential.user, { displayName: username })
          .then(() => {
            Alert.alert("Éxito", "Usuario registrado correctamente");
            navigation.goBack(); // vuelve a login
          });
      })
      .catch((error) => {
        Alert.alert("Registro fallido", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={pass1} onChangeText={setPass1} />
      <TextInput placeholder="Repeat password" style={styles.input} secureTextEntry value={pass2} onChangeText={setPass2} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primary, justifyContent: "center", padding: 30 },
  title: { color: "white", fontSize: 32, textAlign: "center", marginBottom: 30 },
  input: { backgroundColor: "white", borderRadius: 10, padding: 15, marginVertical: 8 },
  button: { backgroundColor: "#4A148C", padding: 15, borderRadius: 20, marginTop: 20 },
  buttonText: { color: "white", textAlign: "center", fontSize: 16 },
  link: { color: "white", textAlign: "center", marginTop: 15 }
});
