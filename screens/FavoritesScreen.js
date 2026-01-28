import React, { useEffect, useState } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import VideoCard from "../components/VideoCard";
import { colors } from "../styles/theme";
import SideMenu from "../components/SideMenu";

import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // 1️⃣ Obtener favoritos del usuario
        const favRef = collection(db, "users", user.uid, "favorites");
        const favSnap = await getDocs(favRef);

        if (favSnap.empty) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        // 2️⃣ Obtener los vídeos reales
        const videoPromises = favSnap.docs.map((fav) =>
          getDoc(doc(db, "Videos", fav.id))
        );

        const videoDocs = await Promise.all(videoPromises);

        const data = videoDocs
          .filter((v) => v.exists())
          .map((v) => ({
            id: v.id,
            ...v.data()
          }));

        setFavorites(data);
      } catch (error) {
        console.error("Error cargando favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  // 🔄 Loading simple
  if (loading) {
    return (
      <SideMenu navigation={navigation}>
        <View style={styles.empty}>
          <Text>Cargando favoritos...</Text>
        </View>
      </SideMenu>
    );
  }

  // 📭 Sin favoritos
  if (favorites.length === 0) {
    return (
      <SideMenu navigation={navigation}>
        <View style={styles.empty}>
          <Text>No tienes vídeos en favoritos</Text>
        </View>
      </SideMenu>
    );
  }

  // 🎬 Favoritos reales
  return (
    <SideMenu navigation={navigation}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <VideoCard
              videoId={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
            />
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
