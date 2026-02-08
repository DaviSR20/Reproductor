import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import SideMenu from "../components/SideMenu";
import VideoCard from "../components/VideoCard";
import FloatingAddButton from "../components/FloatingAddButton";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../Firebase/firebase";

export default function HomeScreen({ navigation }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const q = query(
          collection(db, "Videos"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setVideos(data);
      } catch (error) {
        console.error("Error cargando videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <SideMenu navigation={navigation}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            videoId={item.id}
            title={item.title}
            description={item.description}       // 🔹 descripción
            thumbnail={item.thumbnail}
            youtubeId={item.youtubeId}
            createdAt={item.createdAt?.toDate()}  // 🔹 fecha de creación
          />
        )}
      />
      <FloatingAddButton
        onAddVideo={() => console.log("Add video")}
        onCreateList={() => console.log("Create list")}
        navigation={navigation}
      />
    </SideMenu>
  );
}