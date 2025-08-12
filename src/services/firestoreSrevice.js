import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const USER_DATA_TYPES = {
  PERSONAL: 'personalDetails',
  MEDICAL: 'medicalInfo',
  INSURANCE: 'insuranceInfo',
  INSURANCE_POLICIES: 'insurancePolicies',
  EMERGENCY: 'emergencyContact',
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
  async getUserId() {
    return await this.authenticateUser();
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

      console.log(`User data (${dataType}) updated successfully for UID: ${userId}`);
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
      return null;
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
        id: policyData.id || Date.now().toString(),
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
      throw error;
    }
  }

  // ---------- EMERGENCY CONTACTS METHODS ----------
  async saveEmergencyContact(contactData) {
    try {
      const userId = await this.getUserId();
      const userRef = firestore().collection('Siddhi').doc(userId);
      
      const docSnap = await userRef.get();
      let contacts = [];
      
      if (docSnap.exists && docSnap.data().emergencyContact) {
        contacts = Array.isArray(docSnap.data().emergencyContact) 
          ? docSnap.data().emergencyContact 
          : [docSnap.data().emergencyContact];
      }
      
      const contactWithId = {
        ...contactData,
        id: contactData.id || Date.now().toString(),
        updatedAt: new Date().toISOString()
      };
      
      // Check if contact exists and update it, otherwise add new
      const existingIndex = contacts.findIndex(c => c.id === contactWithId.id);
      if (existingIndex >= 0) {
        // Update existing contact
        contacts[existingIndex] = { ...contacts[existingIndex], ...contactWithId };
        console.log('Emergency contact updated successfully');
      } else {
        // Add new contact with createdAt timestamp
        contactWithId.createdAt = new Date().toISOString();
        contacts.push(contactWithId);
        console.log('New emergency contact added successfully');
      }
      
      const updateData = {
        emergencyContact: contacts,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };
      
      if (!docSnap.exists) {
        updateData.createdAt = firestore.FieldValue.serverTimestamp();
      }

      await userRef.set(updateData, { merge: true });
      return contactWithId;
    } catch (error) {
      console.error('Error saving emergency contact:', error);
      throw error;
    }
  }

  async getEmergencyContacts() {
    try {
      const userId = await this.getUserId();
      const docSnap = await firestore().collection('Siddhi').doc(userId).get();
      
      if (!docSnap.exists) return [];
      
      const userData = docSnap.data();
      const contacts = userData.emergencyContact;
      
      if (!contacts) return [];
      return Array.isArray(contacts) ? contacts : [contacts];
    } catch (error) {
      console.error('Error getting emergency contacts:', error);
      return [];
    }
  }

  async deleteEmergencyContact(contactId) {
    try {
      const userId = await this.getUserId();
      const userRef = firestore().collection('Siddhi').doc(userId);
      
      const docSnap = await userRef.get();
      if (!docSnap.exists) return false;
      
      const contacts = docSnap.data().emergencyContact || [];
      const contactsArray = Array.isArray(contacts) ? contacts : [contacts];
      const filteredContacts = contactsArray.filter(c => c.id !== contactId);
      
      await userRef.set({
        emergencyContact: filteredContacts,
        updatedAt: firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      
      return true;
    } catch (error) {
      console.error('Error deleting emergency contact:', error);
      throw error;
    }
  }
}

const firestoreService = new FirestoreService();
export default firestoreService;