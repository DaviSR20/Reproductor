import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

export default function VideoCard({ title }) {
  const [liked, setLiked] = useState(false); // estado para el corazón

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.card}>
      <View style={styles.thumbnail} />
      <Text style={styles.title}>{title}</Text>

      <View style={styles.row}>
        {/* Corazón tocable */}
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"} // icono relleno si está liked
            size={24}
            color={liked ? "red" : colors.text} // rojo si liked
          />
        </TouchableOpacity>

        <Ionicons name="play-circle" size={28} color={colors.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10
  },
  thumbnail: {
    height: 120,
    backgroundColor: "#000",
    borderRadius: 10
  },
  title: {
    marginTop: 5,
    fontWeight: "bold",
    color: colors.text
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  }
});
