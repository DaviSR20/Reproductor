import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "../components/SideMenu";

export default function ProfileScreen({ navigation }) {
  return (
    <SideMenu navigation={navigation}>
      <View style={styles.container}>
        <Ionicons
          name="person-circle"
          size={100}
          color={colors.text}
        />

        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>Alfonso</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>alfonso@gmail.com</Text>

        <View style={styles.favBox}>
          <Text style={styles.favTitle}>Favorite List</Text>
          <Text>Video name</Text>
        </View>

        <TouchableOpacity
          style={styles.logout}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    padding: 20
  },
  label: {
    marginTop: 10,
    color: colors.text,
    fontWeight: "bold"
  },
  value: {
    backgroundColor: "white",
    padding: 10,
    width: "80%",
    borderRadius: 10,
    textAlign: "center"
  },
  favBox: {
    marginTop: 20,
    backgroundColor: colors.card,
    width: "90%",
    padding: 15,
    borderRadius: 15
  },
  favTitle: {
    fontWeight: "bold",
    marginBottom: 10
  },
  logout: {
    marginTop: 30,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 20,
    width: "60%",
    alignItems: "center"
  }
});
