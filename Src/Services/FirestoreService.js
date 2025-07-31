import { db } from './firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

// User ID Management
class UserManager {
  static USER_ID_KEY = 'app_user_id';
  static currentUserId = null;

  static async getUserId() {
    try {
      if (this.currentUserId) {
        return this.currentUserId;
      }

      let userId = await AsyncStorage.getItem(this.USER_ID_KEY);
      
      if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        await AsyncStorage.setItem(this.USER_ID_KEY, userId);
        console.log('Generated new user ID:', userId);
      } else {
        console.log('Using existing user ID:', userId);
      }

      this.currentUserId = userId;
      return userId;
    } catch (error) {
      console.error('Error getting user ID:', error);
      const fallbackId = 'user_' + Date.now();
      this.currentUserId = fallbackId;
      return fallbackId;
    }
  }

  static async resetUserId() {
    try {
      await AsyncStorage.removeItem(this.USER_ID_KEY);
      this.currentUserId = null;
      console.log('User ID reset');
    } catch (error) {
      console.error('Error resetting user ID:', error);
    }
  }
}

class FirestoreService {
  // Add document to collection
  async addDocument(collectionName, data) {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log(`Document added to ${collectionName} with ID:`, docRef.id);
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      throw error;
    }
  }

  // Get all documents from collection
  async getAllDocuments(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      console.log(`Retrieved ${documents.length} documents from ${collectionName}`);
      return documents;
    } catch (error) {
      console.error(`Error getting documents from ${collectionName}:`, error);
      throw error;
    }
  }

  // Get document by ID
  async getDocumentById(collectionName, docId) {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log(`No document found with ID: ${docId}`);
        return null;
      }
    } catch (error) {
      console.error(`Error getting document ${docId} from ${collectionName}:`, error);
      throw error;
    }
  }

  // Get documents by user ID
  async getDocumentsByUserId(collectionName, userId) {
    try {
      const q = query(
        collection(db, collectionName), 
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      console.log(`Retrieved ${documents.length} documents for user ${userId} from ${collectionName}`);
      return documents;
    } catch (error) {
      console.error(`Error getting documents for user ${userId} from ${collectionName}:`, error);
      throw error;
    }
  }

  // Update document
  async updateDocument(collectionName, docId, data) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      console.log(`Document ${docId} updated in ${collectionName}`);
      return true;
    } catch (error) {
      console.error(`Error updating document ${docId} in ${collectionName}:`, error);
      throw error;
    }
  }

  // Delete document
  async deleteDocument(collectionName, docId) {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      console.log(`Document ${docId} deleted from ${collectionName}`);
      return true;
    } catch (error) {
      console.error(`Error deleting document ${docId} from ${collectionName}:`, error);
      throw error;
    }
  }

  // Save user data (combines personal, emergency, medical, insurance)
  async saveUserData(userId, dataType, data) {
    try {
      // Check if document already exists
      const existingDoc = await this.getUserDataByType(userId, dataType);
      
      if (existingDoc) {
        // Update existing document
        await this.updateDocument('userData', existingDoc.id, {
          ...data,
          updatedAt: serverTimestamp()
        });
        console.log(`${dataType} data updated for user ${userId} with ID:`, existingDoc.id);
        return existingDoc.id;
      } else {
        // Create new document
        const userData = {
          userId: userId,
          dataType: dataType,
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        
        const docRef = await addDoc(collection(db, 'userData'), userData);
        console.log(`${dataType} data created for user ${userId} with ID:`, docRef.id);
        return docRef.id;
      }
    } catch (error) {
      console.error(`Error saving ${dataType} data for user ${userId}:`, error);
      throw error;
    }
  }

  // Get user data by type
  async getUserDataByType(userId, dataType) {
    try {
      const q = query(
        collection(db, 'userData'),
        where("userId", "==", userId),
        where("dataType", "==", dataType),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents.length > 0 ? documents[0] : null; // Return latest document
    } catch (error) {
      console.error(`Error getting ${dataType} data for user ${userId}:`, error);
      throw error;
    }
  }

  // Get all user data
  async getAllUserData(userId) {
    try {
      const q = query(
        collection(db, 'userData'),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const userData = {
        personalDetails: null,
        emergencyContact: null,
        medicalInfo: null,
        insuranceInfo: null
      };

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!userData[data.dataType]) {
          userData[data.dataType] = { id: doc.id, ...data };
        }
      });

      return userData;
    } catch (error) {
      console.error(`Error getting all data for user ${userId}:`, error);
      throw error;
    }
  }

  // Get user ID (integrated from UserService)
  async getUserId() {
    return await UserManager.getUserId();
  }

  // Reset user ID (integrated from UserService)
  async resetUserId() {
    return await UserManager.resetUserId();
  }
}

const firestoreService = new FirestoreService();
export default firestoreService;
export { UserManager };