import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const saveReminderToFirestore = async (reminder) => {
  try {
    const docRef = await addDoc(collection(db, 'reminders'), reminder);
    console.log('Reminder saved with ID:', docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Restore reminders for a user
export const getRemindersForUser = async (userId) => {
  try {
    const q = query(collection(db, 'reminders'), where('userId', '==', userId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return [];
  }
};
