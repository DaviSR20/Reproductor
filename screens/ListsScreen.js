import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  StyleSheet,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import SideMenu from "../components/SideMenu";
import ListCard from "../components/ListCard";

import { db, auth } from "../Firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

export default function ListsScreen({ navigation }) {
  const [lists, setLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "lists"),
      where("ownerId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedLists = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLists(fetchedLists);
    });

    return () => unsubscribe();
  }, []);

  const onCreateList = async () => {
    const user = auth.currentUser;

    if (!newTitle) {
      Alert.alert("Error", "Please enter a list title");
      return;
    }

    try {
      await addDoc(collection(db, "lists"), {
        title: newTitle,
        ownerId: user.uid,
        ownerEmail: user.email,
        createdAt: new Date(),
        videos: []
      });

      setNewTitle("");
      setModalVisible(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not create list");
    }
  };

  return (
    <SideMenu navigation={navigation}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item }) => (
            <ListCard
              title={item.title}
              videos={item.videos}
              navigation={navigation}
              listId={item.id} // 🔹 pasamos el id de la lista
            />
          )}
        />

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

        {/* Modal */}
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
                value={newTitle}
                onChangeText={setNewTitle}
                style={styles.input}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={onCreateList}
                  style={styles.modalButton}
                >
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
    </SideMenu>
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