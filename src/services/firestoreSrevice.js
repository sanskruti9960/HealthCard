import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Helper function to generate unique IDs
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Helper function to sanitize data for logging
const sanitizeForLog = (data) => {
  if (typeof data === 'string') {
    return encodeURIComponent(data);
  }
  if (typeof data === 'object' && data !== null) {
    return JSON.stringify(data).substring(0, 100) + '...';
  }
  return String(data);
};

// Helper function to normalize arrays
const normalizeToArray = (data) => {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
};

export const USER_DATA_TYPES = {
  PERSONAL: 'personalDetails',
  MEDICAL: 'medicalInfo',
  INSURANCE: 'insuranceInfo',
  INSURANCE_POLICIES: 'insurancePolicies',
  EMERGENCY: 'emergencyContacts',
};

class FirestoreService {
  // ---------- AUTHENTICATE USER ----------
  async authenticateUser() {
    const firebaseUser = auth().currentUser;
    if (!firebaseUser) {
      throw new Error('No Firebase user authenticated. Please sign in first.');
    }
    return firebaseUser.uid;
  }

  // ---------- USER ID ----------
  getUserId() {
    return this.authenticateUser();
  }

  // ---------- SAVE USER DATA (BY TYPE) ----------
  async saveUserData(dataType, data) {
    try {
      const userId = await this.getUserId();
      const userRef = firestore().collection('Siddhi').doc(userId);
      
      // Always use merge: true to update existing data instead of overwriting
      const updateData = {
        [dataType]: data,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
      
      const docSnap = await userRef.get();
      if (!docSnap.exists) {
        updateData.createdAt = firestore.FieldValue.serverTimestamp();
      }

      // This will update existing data or create new if doesn't exist
      await userRef.set(updateData, { merge: true });

      console.log(`User data (${sanitizeForLog(dataType)}) updated successfully for UID: ${sanitizeForLog(userId)}`);
      return true;
    } catch (error) {
      console.error('Error updating user data:', error);
      throw error;
    }
  }

  // ---------- GET USER DATA BY TYPE ----------
  async getUserDataByType(dataType) {
    try {
      const userId = await this.getUserId();
      const docSnap = await firestore().collection('Siddhi').doc(userId).get();
      if (!docSnap.exists) return null;

      const userData = docSnap.data();
      return userData[dataType] ? userData[dataType] : null;
    } catch (error) {
      console.error('Error getting user data by type:', error);
      throw error;
    }
  }

  // ---------- GET ALL USER DATA ----------
  async getAllUserData() {
    try {
      const userId = await this.getUserId();
      const docSnap = await firestore().collection('Siddhi').doc(userId).get();

      if (!docSnap.exists) {
        const emptyData = {};
        Object.values(USER_DATA_TYPES).forEach(type => (emptyData[type] = null));
        return emptyData;
      }

      const data = docSnap.data();
      Object.values(USER_DATA_TYPES).forEach(type => {
        if (!data[type]) data[type] = null;
      });
      return data;
    } catch (error) {
      console.error('Error getting all user data:', error);
      throw error;
    }
  }

  // ---------- INSURANCE POLICIES METHODS ----------
  async saveInsurancePolicy(policyData) {
    try {
      const userId = await this.getUserId();
      const userRef = firestore().collection('Siddhi').doc(userId);
      
      const docSnap = await userRef.get();
      let policies = [];
      
      if (docSnap.exists && docSnap.data().insurancePolicies) {
        policies = docSnap.data().insurancePolicies;
      }
      
      const policyWithId = {
        ...policyData,
        id: policyData.id || generateUniqueId(),
        updatedAt: new Date().toISOString()
      };
      
      // Check if policy exists and update it, otherwise add new
      const existingIndex = policies.findIndex(p => p.id === policyWithId.id);
      if (existingIndex >= 0) {
        // Update existing policy
        policies[existingIndex] = { ...policies[existingIndex], ...policyWithId };
        console.log('Insurance policy updated successfully');
      } else {
        // Add new policy with createdAt timestamp
        policyWithId.createdAt = new Date().toISOString();
        policies.push(policyWithId);
        console.log('New insurance policy added successfully');
      }
      
      const updateData = {
        insurancePolicies: policies,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
      
      if (!docSnap.exists) {
        updateData.createdAt = firestore.FieldValue.serverTimestamp();
      }

      // Always use merge to update existing document
      await userRef.set(updateData, { merge: true });
      return policyWithId;
    } catch (error) {
      console.error('Error saving insurance policy:', error);
      throw error;
    }
  }

  async getInsurancePolicies() {
    try {
      const userId = await this.getUserId();
      const docSnap = await firestore().collection('Siddhi').doc(userId).get();
      
      if (!docSnap.exists) return [];
      
      const userData = docSnap.data();
      return userData.insurancePolicies || [];
    } catch (error) {
      console.error('Error getting insurance policies:', error);
      return [];
    }
  }

  async deleteInsurancePolicy(policyId) {
    try {
      const userId = await this.getUserId();
      const userRef = firestore().collection('Siddhi').doc(userId);
      
      const docSnap = await userRef.get();
      if (!docSnap.exists) return false;
      
      const policies = docSnap.data().insurancePolicies || [];
      const filteredPolicies = policies.filter(p => p.id !== policyId);
      
      await userRef.set({
        insurancePolicies: filteredPolicies,
        updatedAt: firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      return true;
    } catch (error) {
      console.error('Error deleting insurance policy:', error);
      return false;
    }
  }

  // ---------- EMERGENCY CONTACTS METHODS ----------
async saveEmergencyContact(contactData) {
  try {
    console.log('Saving emergency contact:', sanitizeForLog(contactData));

    if (!contactData?.emergencyName || !contactData?.emergencyPhone) {
      throw new Error('Missing required contact data');
    }

    const userId = await this.getUserId();
    console.log('User ID:', sanitizeForLog(userId));

    const userRef = firestore().collection('Siddhi').doc(userId);
    const docSnap = await userRef.get();

    // Always start with a safe default
    const userData = docSnap.exists ? (docSnap.data() || {}) : {};
    let contacts = Array.isArray(userData.emergencyContacts)
      ? [...userData.emergencyContacts]
      : [];

    const contactWithId = {
      emergencyName: contactData.emergencyName,
      emergencyPhone: contactData.emergencyPhone,
      emergencyRelation: contactData.emergencyRelation || '',
      id: contactData.id || generateUniqueId(),
      createdAt: contactData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Update if exists, else push
    const existingIndex = contacts.findIndex(c => c.id === contactWithId.id);
    if (existingIndex >= 0) {
      contacts[existingIndex] = contactWithId;
      console.log('Emergency contact updated successfully');
    } else {
      contacts.push(contactWithId);
      console.log('New emergency contact added successfully');
    }

    const updateData = {
      emergencyContacts: contacts,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };

    if (!docSnap.exists) {
      updateData.createdAt = firestore.FieldValue.serverTimestamp();
    }

    await userRef.set(updateData, { merge: true });
    console.log('Emergency contact saved to Firestore successfully');

    return contactWithId;
  } catch (error) {
    console.error('Error saving emergency contact:', error?.message || error);
    throw error;
  }
}


 async getEmergencyContacts() {
  try {
    const userId = await this.getUserId();
    const docSnap = await firestore()
      .collection('Siddhi')
      .doc(userId)
      .get();

    if (!docSnap.exists) return [];

    const userData = docSnap.data() || {}; // safe fallback
    return normalizeToArray(userData.emergencyContacts || []); // ensure array
  } catch (error) {
    console.error('Error getting emergency contacts:', error?.message || error);
    return [];
  }
}


  async deleteEmergencyContact(contactId) {
    try {
      const userId = await this.getUserId();
      const userRef = firestore().collection('Siddhi').doc(userId);
      
      const docSnap = await userRef.get();
      if (!docSnap.exists) return false;
      
      const contacts = docSnap.data().emergencyContacts || [];
      const contactsArray = normalizeToArray(contacts);
      const filteredContacts = contactsArray.filter(c => c.id !== contactId);
      
      await userRef.set({
        emergencyContacts: filteredContacts,
        updatedAt: firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      return true;
    } catch (error) {
      console.error('Error deleting emergency contact:', error);
      return false;
    }
  }
}

const firestoreService = new FirestoreService();
export default firestoreService;