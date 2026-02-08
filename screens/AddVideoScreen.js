import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { getYoutubeId } from "../Utils/youtube";
import { colors } from "../styles/theme";

export default function AddVideoScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = async () => {
    if (!title || !url) {
      Alert.alert("Error", "Title and URL are required");
      return;
    }

    const youtubeId = getYoutubeId(url);

    if (!youtubeId) {
      Alert.alert("Error", "Invalid YouTube URL");
      return;
    }

    try {
      await addDoc(collection(db, "Videos"), {
        title,
        description,
        youtubeId,
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        lists: [], // 👈 ARRAY para listas futuras
        createdAt: serverTimestamp()
      });

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ADD Song</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Insert the Name of the Song</Text>
        <TextInput
          style={styles.input}
          placeholder="Name a song"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Insert the Description of the Song</Text>
        <TextInput
          style={styles.input}
          placeholder="Describe the song"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Insert the URL of the Song</Text>
        <TextInput
          style={styles.input}
          placeholder="URL"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.acceptBtn} onPress={handleAdd}>
          <Text style={styles.btnText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8D1F2"
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50
  },
  form: {
    marginTop: 30,
    paddingHorizontal: 25
  },
  label: {
    marginTop: 15,
    marginBottom: 5
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10
  },
  acceptBtn: {
    backgroundColor: "#222",
    marginTop: 30,
    padding: 15,
    borderRadius: 25,
    alignItems: "center"
  },
  cancelBtn: {
    backgroundColor: "#999",
    marginTop: 15,
    padding: 15,
    borderRadius: 25,
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold"
  }
});