import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";

export async function addToFavorites(videoId) {
  const user = auth.currentUser;
  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid, "favorites", videoId),
    { addedAt: new Date() }
  );
}

export async function removeFromFavorites(videoId) {
  const user = auth.currentUser;
  if (!user) return;

  await deleteDoc(
    doc(db, "users", user.uid, "favorites", videoId)
  );
}

export async function isFavorite(videoId) {
  const user = auth.currentUser;
  if (!user) return false;

  const ref = doc(db, "users", user.uid, "favorites", videoId);
  const snap = await getDoc(ref);

  return snap.exists();
}
