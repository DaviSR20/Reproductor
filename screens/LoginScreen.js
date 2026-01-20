import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NoTube</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Register</Text>
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
  },
  link: {
    color: "white",
    textAlign: "center",
    marginTop: 15
  }
});
