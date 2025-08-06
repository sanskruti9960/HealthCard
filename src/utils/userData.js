import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';

/**
 * Fetches user signup/profile data from Firestore by UID.
 * @param {string} uid - The user's UID.
 * @returns {Promise<Object|null>} - The user data object or null if not found.
 */
export const getUserData = async (uid) => {
  try {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'Siddhi', uid);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists ? userDoc.data() : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
