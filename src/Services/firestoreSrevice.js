import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/* ================= HELPERS ================= */

// Wait until Firebase Auth is ready (CRITICAL for APK)
const waitForAuth = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        unsubscribe();
        resolve(user);
      }
    });

    // Safety timeout (5s)
    setTimeout(() => {
      unsubscribe();
      reject(new Error('Firebase auth timeout'));
    }, 5000);
  });

// Remove undefined values (Firestore-safe)
const sanitize = (obj = {}) => {
  const clean = {};
  Object.keys(obj).forEach(key => {
    clean[key] = obj[key] === undefined ? '' : obj[key];
  });
  return clean;
};

// Always return array
const normalizeArray = data => (Array.isArray(data) ? data : []);

// Unique ID generator
const generateUniqueId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

/* ================= CONSTANTS ================= */

export const USER_DATA_TYPES = {
  PERSONAL: 'personalDetails',
  MEDICAL: 'medicalInfo',
  INSURANCE: 'insuranceInfo',
  INSURANCE_POLICIES: 'insurancePolicies',
  EMERGENCY: 'emergencyContacts',
};

/* ================= SERVICE ================= */

class FirestoreService {
  /* ---------- AUTH SAFE USER ---------- */
  async getUser() {
    const user = auth().currentUser;
    if (user) return user;
    return await waitForAuth(); // APK FIX
  }

  /* ---------- SAVE GENERIC USER DATA ---------- */
  async saveUserData(dataType, data) {
    try {
      const user = await this.getUser();
      const cleanData = sanitize(data);

      await firestore()
        .collection('Siddhi')
        .doc(user.uid)
        .set(
          { [dataType]: cleanData },
          { merge: true }
        );

      return true;
    } catch (error) {
      console.error('❌ saveUserData failed:', error);
      throw error;
    }
  }

  /* ---------- GET USER DATA BY TYPE ---------- */
  async getUserDataByType(dataType) {
    try {
      const user = await this.getUser();

      const doc = await firestore()
        .collection('Siddhi')
        .doc(user.uid)
        .get();

      if (!doc.exists) return null;

      const data = doc.data() || {};
      return data[dataType] ?? null;
    } catch (error) {
      console.error('❌ getUserDataByType failed:', error);
      return null;
    }
  }

  /* ---------- GET ALL USER DATA ---------- */
  async getAllUserData() {
    try {
      const user = await this.getUser();

      const doc = await firestore()
        .collection('Siddhi')
        .doc(user.uid)
        .get();

      return doc.exists ? doc.data() || {} : {};
    } catch (error) {
      console.error('❌ getAllUserData failed:', error);
      return {};
    }
  }

  /* ---------- INSURANCE POLICIES ---------- */
  async saveInsurancePolicy(policyData) {
    try {
      const user = await this.getUser();
      const userRef = firestore().collection('Siddhi').doc(user.uid);
      const doc = await userRef.get();

      const policies = normalizeArray(doc.data()?.insurancePolicies);

      const policy = sanitize({
        ...policyData,
        id: policyData.id || generateUniqueId(),
      });

      const index = policies.findIndex(p => p.id === policy.id);
      index >= 0 ? (policies[index] = policy) : policies.push(policy);

      await userRef.set(
        { insurancePolicies: policies },
        { merge: true }
      );

      return policy;
    } catch (error) {
      console.error('❌ saveInsurancePolicy failed:', error);
      return null;
    }
  }

  async getInsurancePolicies() {
    try {
      const user = await this.getUser();

      const doc = await firestore()
        .collection('Siddhi')
        .doc(user.uid)
        .get();

      return normalizeArray(doc.data()?.insurancePolicies);
    } catch (error) {
      console.error('❌ getInsurancePolicies failed:', error);
      return [];
    }
  }

  async deleteInsurancePolicy(policyId) {
    try {
      const user = await this.getUser();
      const userRef = firestore().collection('Siddhi').doc(user.uid);
      const doc = await userRef.get();

      const policies = normalizeArray(doc.data()?.insurancePolicies)
        .filter(p => p.id !== policyId);

      await userRef.set(
        { insurancePolicies: policies },
        { merge: true }
      );

      return true;
    } catch (error) {
      console.error('❌ deleteInsurancePolicy failed:', error);
      return false;
    }
  }

  /* ---------- EMERGENCY CONTACTS ---------- */
  async saveEmergencyContact(contactData) {
    try {
      const user = await this.getUser();
      const userRef = firestore().collection('Siddhi').doc(user.uid);
      const doc = await userRef.get();

      const contacts = normalizeArray(doc.data()?.emergencyContacts);

      const contact = sanitize({
        ...contactData,
        id: contactData.id || generateUniqueId(),
      });

      const index = contacts.findIndex(c => c.id === contact.id);
      index >= 0 ? (contacts[index] = contact) : contacts.push(contact);

      await userRef.set(
        { emergencyContacts: contacts },
        { merge: true }
      );

      return contact;
    } catch (error) {
      console.error('❌ saveEmergencyContact failed:', error);
      return null;
    }
  }

  async getEmergencyContacts() {
    try {
      const user = await this.getUser();

      const doc = await firestore()
        .collection('Siddhi')
        .doc(user.uid)
        .get();

      return normalizeArray(doc.data()?.emergencyContacts);
    } catch (error) {
      console.error('❌ getEmergencyContacts failed:', error);
      return [];
    }
  }

  async deleteEmergencyContact(contactId) {
    try {
      const user = await this.getUser();
      const userRef = firestore().collection('Siddhi').doc(user.uid);
      const doc = await userRef.get();

      const contacts = normalizeArray(doc.data()?.emergencyContacts)
        .filter(c => c.id !== contactId);

      await userRef.set(
        { emergencyContacts: contacts },
        { merge: true }
      );

      return true;
    } catch (error) {
      console.error('❌ deleteEmergencyContact failed:', error);
      return false;
    }
  }
}

/* ================= EXPORT ================= */

export default new FirestoreService();
