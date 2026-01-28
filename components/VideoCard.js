import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

import {
  addToFavorites,
  removeFromFavorites,
  isFavorite
} from "../components/favoritesService";

export default function VideoCard({ title, thumbnail, videoId }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const fav = await isFavorite(videoId);
      setLiked(fav);
    };

    checkFavorite();
  }, []);

  const toggleLike = async () => {
    if (liked) {
      await removeFromFavorites(videoId);
    } else {
      await addToFavorites(videoId);
    }
    setLiked(!liked);
  };

  return (
    <View style={styles.card}>
      <View style={styles.thumbnail}>
        <Image source={{ uri: thumbnail }} style={styles.image} />
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={liked ? "red" : colors.text}
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
    borderRadius: 10,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
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
