import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";

export async function createUserProfile() {
  const user = auth.currentUser;
  if (!user) return;

  await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email,
      createdAt: new Date()
    },
    { merge: true } // 👈 muy importante
  );
}
