import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const titles = [
  "Podcast con streamer",
  "Gameplay intenso",
  "Charla random",
  "Momento viral",
  "Resumen semanal",
  "Clip destacado"
];

export async function seedVideos(count = 10) {
  try {
    const ref = collection(db, "Videos");

    for (let i = 0; i < count; i++) {
      await addDoc(ref, {
        title: titles[Math.floor(Math.random() * titles.length)],
        description: "Descripción corta",
        thumbnail: `https://picsum.photos/400/300?random=${Math.random()}`,
        videoUrl: "https://example.com/video.mp4",
        createdAt: Timestamp.now()
      });
    }

    console.log("✅ Videos creados correctamente");
  } catch (error) {
    console.error("❌ Error creando videos:", error);
  }
}
