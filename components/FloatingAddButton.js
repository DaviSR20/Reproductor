import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Modal,
  TextInput,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import { db } from "../Firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function FloatingAddButton({
  onAddVideo,
  navigation
}) {
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [listOwner, setListOwner] = useState("");

  const animation = useState(new Animated.Value(0))[0];

  const toggleMenu = () => {
    Animated.spring(animation, {
      toValue: open ? 0 : 1,
      useNativeDriver: true
    }).start();
    setOpen(!open);
  };

  const addVideoStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60]
        })
      }
    ],
    opacity: animation
  };

  const createListStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120]
        })
      }
    ],
    opacity: animation
  };

  // Crear lista en Firebase
  const onCreateList = async () => {
    if (!listTitle || !listOwner) {
      Alert.alert("Error", "Please enter both title and owner");
      return;
    }
    try {
      await addDoc(collection(db, "lists"), {
        title: listTitle,
        owner: listOwner,
        videos: [],
        createdAt: new Date()
      });
      setListTitle("");
      setListOwner("");
      setModalVisible(false);
      setOpen(false);
      Alert.alert("List created!", "Your list has been created successfully.");
    } catch (error) {
      console.log("Error creating list:", error);
      Alert.alert("Error", "Could not create list");
    }
  };

  return (
    <View style={styles.container}>
      {/* Add Video */}
      <Animated.View style={[styles.option, addVideoStyle]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddVideo")}
          style={styles.optionBtn}
        >
          <Ionicons name="videocam" size={20} color="#fff" />
          <Text style={styles.optionText}>Add video</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Create List */}
      <Animated.View style={[styles.option, createListStyle]}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.optionBtn}
        >
          <Ionicons name="folder" size={20} color="#fff" />
          <Text style={styles.optionText}>Create list</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Button */}
      <TouchableOpacity style={styles.fab} onPress={toggleMenu}>
        <Ionicons name={open ? "close" : "add"} size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal de creación */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New List</Text>
            <TextInput
              placeholder="List title"
              value={listTitle}
              onChangeText={setListTitle}
              style={styles.input}
            />
            <TextInput
              placeholder="Owner"
              value={listOwner}
              onChangeText={setListOwner}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={onCreateList} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalButton, { backgroundColor: "#888" }]}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 35,
    right: 25,
    alignItems: "center"
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary || "#7c3aed",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6
  },
  option: {
    position: "absolute",
    right: 0
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7c3aed",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: 110
  },
  optionText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 12
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
    padding: 20
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.text
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center"
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});