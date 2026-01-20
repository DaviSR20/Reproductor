import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import VideoCard from "../components/VideoCard";
import { colors } from "../styles/theme";

export default function FeedScreen({ navigation }) {
  const videos = [
    { id: "1", title: "Title the video" },
    { id: "2", title: "Another video" },
    { id: "3", title: "Cool music" }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => <VideoCard title={item.title} />}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddSong")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
