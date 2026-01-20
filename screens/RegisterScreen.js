import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry value={pass1} onChangeText={setPass1} />
      <TextInput placeholder="Repeat password" style={styles.input} secureTextEntry value={pass2} onChangeText={setPass2} />

      <TouchableOpacity style={styles.button}>
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
