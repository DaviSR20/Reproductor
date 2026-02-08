import React, { useEffect } from "react";
import { View, StyleSheet, Text, Alert, Dimensions } from "react-native";

import { useYouTubePlayer, YoutubeView, useYouTubeEvent } from "react-native-youtube-bridge";

export default function VideoPlayerScreen({ route }) {
  const { youtubeId } = route.params;

  // Crear el player con el videoId recibido
  const player = useYouTubePlayer(youtubeId, {
    autoplay: true,
    controls: true,
    playsinline: true,
    rel: false
  });

  // Evento de ready
  useYouTubeEvent(player, "ready", () => {
    console.log("🎬 YouTube Player is ready!");
  });

  // Evento de error
  useYouTubeEvent(player, "error", (error) => {
    console.log("❌ YouTube Player error:", error);
    Alert.alert("Error loading video", error.message || "An error occurred");
  });

  // Si no hay ID, mostrar mensaje
  if (!youtubeId) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>No YouTube ID provided!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <YoutubeView
          player={player}
          height={Dimensions.get("window").width * 0.5625} // 16:9 ratio
          width={Dimensions.get("window").width}
          webViewStyle={{ opacity: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  playerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});