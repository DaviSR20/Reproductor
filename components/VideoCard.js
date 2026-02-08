import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../Firebase/firebase";
import { collection, onSnapshot, doc, updateDoc, arrayUnion, deleteDoc, query, where } from "firebase/firestore";

import {
  addToFavorites,
  removeFromFavorites,
  isFavorite
} from "../components/favoritesService";

export default function VideoCard({ title, description, thumbnail, videoId, youtubeId, createdAt }) {
  const navigation = useNavigation();

  const [liked, setLiked] = useState(false);
  const [lists, setLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // NUEVO: estado para toast
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // ======================
  // FAVORITOS
  // ======================
  useEffect(() => {
    const checkFavorite = async () => {
      const fav = await isFavorite(videoId);
      setLiked(fav);
    };
    checkFavorite();
  }, [videoId]);

  const toggleLike = async () => {
    if (liked) {
      await removeFromFavorites(videoId);
    } else {
      await addToFavorites(videoId);
    }
    setLiked(!liked);
  };

  // ======================
  // LISTAS
  // ======================
  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "lists"),
      where("ownerId", "==", auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLists(data);
    });

    return () => unsubscribe();
  }, []);

  const addVideoToList = async (listId) => {
    try {
      const listRef = doc(db, "lists", listId);

      await updateDoc(listRef, {
        videos: arrayUnion({
          videoId,
          title,
          description,
          thumbnail,
          youtubeId,
          createdAt
        })
      });

      setModalVisible(false);
      // TOAST PERSONALIZADO
      setToastMessage(`🎉 "${title}" added to "${lists.find(l => l.id === listId)?.title}"`);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not add video to list");
    }
  };

  // ======================
  // ELIMINAR VIDEO
  // ======================
  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this video?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: deleteVideo }
      ]
    );
  };

  const deleteVideo = async () => {
    try {
      await deleteDoc(doc(db, "Videos", videoId));
      Alert.alert("Deleted ✅", "Video has been removed");
    } catch (error) {
      console.log("REMOVE VIDEO ERROR:", error);
      Alert.alert("Error", "Could not delete video");
    }
  };

  const getYoutubeId = (id) => {
    if (!id) return "";
    if (id.includes("v=")) return id.split("v=")[1].split("&")[0];
    return id;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.card}>
      <View style={styles.thumbnail}>
        <Image source={{ uri: thumbnail }} style={styles.image} />
      </View>

      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {createdAt ? <Text style={styles.date}>{formatDate(createdAt)}</Text> : null}

      {/* BOTONES */}
      <View style={styles.row}>
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={liked ? "red" : colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="folder-outline" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmDelete}>
          <Ionicons name="trash-outline" size={28} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("VideoPlayer", {
              youtubeId: getYoutubeId(youtubeId)
            })
          }
        >
          <Ionicons name="play-circle" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* MODAL LISTAS */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add to list</Text>

            <FlatList
              data={lists}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItem}
                  onPress={() => addVideoToList(item.id)}
                >
                  <Ionicons name="folder" size={20} color={colors.text} />
                  <Text style={styles.listText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeBtn}
            >
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* TOAST PERSONALIZADO */}
      {toastVisible && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
    marginHorizontal: 20
  },
  thumbnail: {
    height: 120,
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
  description: {
    marginTop: 3,
    color: colors.text,
    opacity: 0.8
  },
  date: {
    marginTop: 2,
    color: colors.text,
    fontSize: 12,
    opacity: 0.6
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 15
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: colors.text
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10
  },
  listText: {
    marginLeft: 10,
    color: colors.text
  },
  closeBtn: {
    marginTop: 10,
    alignItems: "center"
  },
  closeText: {
    color: colors.primary,
    fontWeight: "bold"
  },
  // TOAST
  toast: {
    position: "absolute",
    bottom: 30,
    left: "10%",
    right: "10%",
    backgroundColor: "rgba(0,0,0,0.85)",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999
  },
  toastText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});