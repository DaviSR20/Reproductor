import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { colors } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import SideMenu from "../components/SideMenu";

import { auth, db } from "../Firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Mostrar datos básicos
    setUserData({
      username: user.displayName || "No name",
      email: user.email
    });

    // Escuchar listas donde el usuario es owner
    const q = query(collection(db, "lists"), where("ownerId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const favLists = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFavorites(favLists);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  return (
    <SideMenu navigation={navigation}>
      <View style={styles.container}>
        <Ionicons
          name="person-circle"
          size={100}
          color={colors.text}
        />

        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{userData?.username}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{userData?.email}</Text>

        <View style={styles.favBox}>
          <Text style={styles.favTitle}>Your Lists</Text>
          {favorites.length > 0 ? (
            <FlatList
              data={favorites}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Text style={{ marginBottom: 5 }}>• {item.title}</Text>
              )}
            />
          ) : (
            <Text>No lists yet</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.logout}
          onPress={handleLogout}
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