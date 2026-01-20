import React from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import SideMenu from "../components/SideMenu";

export default function ListsScreen({ navigation }) {
  const lists = [
    { id: "1", title: "My favorites" },
    { id: "2", title: "Chill music" },
    { id: "3", title: "Gaming" }
  ];

  return (
    <SideMenu navigation={navigation}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Ionicons name="chevron-down" size={24} color={colors.text} />
            </View>
          )}
        />

        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "bold",
    color: colors.text
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});
