import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/theme";

export default function AddSongScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Description" style={styles.input} />
      <TextInput placeholder="URL" style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: colors.text, textAlign: "center", marginTop: 10 }}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 20,
    marginTop: 20
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  }
});
