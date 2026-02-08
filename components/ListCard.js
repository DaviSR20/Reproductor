import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import { db } from "../Firebase/firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { Alert } from "react-native";
export default function ListCard({ title, videos = [], navigation, listId }) {
  const [open, setOpen] = useState(false);
  const removeVideoFromList = async (video) => {
    try {
      const listRef = doc(db, "lists", listId);

      // Eliminamos el vídeo filtrando por videoId
      await updateDoc(listRef, {
        videos: videos.filter(v => v.videoId !== video.videoId)
      });
    } catch (error) {
      console.log("REMOVE VIDEO ERROR:", error);
      Alert.alert("Error", "Could not remove video");
    }
  };
  const confirmRemoveVideo = (video) => {
    Alert.alert(
      "Eliminar video",
      "¿Estás seguro que quieres eliminar este video de la lista?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => removeVideoFromList(video)
        }
      ]
    );
  };
  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}
      >
        <Text style={styles.title}>{title}</Text>
        <Ionicons
          name={open ? "chevron-up" : "chevron-down"}
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>

      {/* Content */}
      {open && (
        <View style={styles.content}>
          {videos.length > 0 ? (
            videos.map((video) => (
              <View key={video.videoId} style={styles.videoRow}>
                <Image
                  source={{ uri: video.thumbnail }}
                  style={styles.thumbnail}
                />

                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle} numberOfLines={2}>
                    {video.title}
                  </Text>
                </View>

                {/* DELETE */}
                <TouchableOpacity
                  onPress={() => confirmRemoveVideo(video)}
                  style={{ marginRight: 10 }}
                >
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>

                {/* PLAY */}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("VideoPlayer", {
                      youtubeId: video.youtubeId
                    })
                  }
                >
                  <Ionicons
                    name="play-circle"
                    size={30}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No items yet</Text>
          )}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10
  },
  card: {
    backgroundColor: colors.card,
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontWeight: "bold",
    color: colors.text,
    fontSize: 16
  },
  content: {
    backgroundColor: colors.card,
    marginTop: 5,
    padding: 10,
    borderRadius: 12
  },
  emptyText: {
    color: colors.text,
    opacity: 0.6,
    padding: 10
  },

  /* VIDEO ROW */
  videoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8
  },
  thumbnail: {
    width: 60,
    height: 40,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: "#000"
  },
  videoInfo: {
    flex: 1,
    marginRight: 10
  },
  videoTitle: {
    color: colors.text,
    fontSize: 14
  }
});