import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import VideoCard from "../components/VideoCard";
import { colors } from "../styles/theme";
import SideMenu from "../components/SideMenu";

export default function FavoritesScreen({ navigation }) {
  const favorites = [
    { id: "1", title: "Favorite video 1" },
    { id: "2", title: "Favorite song 2" }
  ];

  if (favorites.length === 0) {
    return (
      <SideMenu navigation={navigation}>
        <View style={styles.empty}>
          <Text>No List available</Text>
        </View>
      </SideMenu>
    );
  }

  return (
    <SideMenu navigation={navigation}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <VideoCard title={item.title} />
          )}
        />
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background
  }
});
