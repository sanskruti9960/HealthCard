import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


/*------------------ HELPERS ------------------ */

const generateUniqueId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const normalizeArray = (data) =>
  Array.isArray(data) ? data : [];

export const USER_DATA_TYPES = {
  PERSONAL: 'personalDetails',
  MEDICAL: 'medicalInfo',
  INSURANCE: 'insuranceInfo',
  INSURANCE_POLICIES: 'insurancePolicies',
  EMERGENCY: 'emergencyContacts',
};

/* ------------------ SERVICE ------------------ */

class FirestoreService {
  /* ---------- SAFE USER ID ---------- */
  async getUserId() {
    const user = auth().currentUser;

    if (!user) {
      console.warn('⚠ Firebase user not ready yet');
      return null;
    }

    return user.uid;
  }

  /* ---------- SAVE GENERIC USER DATA ---------- */
  async saveUserData(dataType, data) {
    try {
      const userId = await this.getUserId();
      if (!userId) return false;

      await firestore()
        .collection('Siddhi')
        .doc(userId)
        .set(
          {
            [dataType]: data,
          },
          { merge: true }
        );

      return true;
    } catch (error) {
      console.error('❌ saveUserData failed:', error);
      return false;
    }
  }

  /* ---------- GET USER DATA BY TYPE ---------- */
  async getUserDataByType(dataType) {
    try {
      const userId = await this.getUserId();
      if (!userId) return null;

      const doc = await firestore()
        .collection('Siddhi')
        .doc(userId)
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
      const userId = await this.getUserId();
      if (!userId) return {};

      const doc = await firestore()
        .collection('Siddhi')
        .doc(userId)
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
      const userId = await this.getUserId();
      if (!userId) return null;

      const userRef = firestore().collection('Siddhi').doc(userId);
      const doc = await userRef.get();

      const policies = normalizeArray(doc.data()?.insurancePolicies);

      const policy = {
        ...policyData,
        id: policyData.id || generateUniqueId(),
      };

      const index = policies.findIndex(p => p.id === policy.id);
      index >= 0 ? (policies[index] = policy) : policies.push(policy);

      await userRef.set(
        {
          insurancePolicies: policies,
        },
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
      const userId = await this.getUserId();
      if (!userId) return [];

      const doc = await firestore()
        .collection('Siddhi')
        .doc(userId)
        .get();

      return normalizeArray(doc.data()?.insurancePolicies);
    } catch (error) {
      console.error('❌ getInsurancePolicies failed:', error);
      return [];
    }
  }

  async deleteInsurancePolicy(policyId) {
    try {
      const userId = await this.getUserId();
      if (!userId) return false;

      const userRef = firestore().collection('Siddhi').doc(userId);
      const doc = await userRef.get();

      const policies = normalizeArray(doc.data()?.insurancePolicies)
        .filter(p => p.id !== policyId);

      await userRef.set(
        {
          insurancePolicies: policies,
        },
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
      if (!contactData?.emergencyName || !contactData?.emergencyPhone) {
        return null;
      }

      const userId = await this.getUserId();
      if (!userId) return null;

      const userRef = firestore().collection('Siddhi').doc(userId);
      const doc = await userRef.get();

      const contacts = normalizeArray(doc.data()?.emergencyContacts);

      const contact = {
        ...contactData,
        id: contactData.id || generateUniqueId(),
      };

      const index = contacts.findIndex(c => c.id === contact.id);
      index >= 0 ? (contacts[index] = contact) : contacts.push(contact);

      await userRef.set(
        {
          emergencyContacts: contacts,
        },
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
      const userId = await this.getUserId();
      if (!userId) return [];

      const doc = await firestore()
        .collection('Siddhi')
        .doc(userId)
        .get();

      return normalizeArray(doc.data()?.emergencyContacts);
    } catch (error) {
      console.error('❌ getEmergencyContacts failed:', error);
      return [];
    }
  }

  async deleteEmergencyContact(contactId) {
    try {
      const userId = await this.getUserId();
      if (!userId) return false;

      const userRef = firestore().collection('Siddhi').doc(userId);
      const doc = await userRef.get();

      const contacts = normalizeArray(doc.data()?.emergencyContacts)
        .filter(c => c.id !== contactId);

      await userRef.set(
        {
          emergencyContacts: contacts,
        },
        { merge: true }
      );

      return true;
    } catch (error) {
      console.error('❌ deleteEmergencyContact failed:', error);
      return false;
    }
  }
}

/* ---------- EXPORT ---------- */
export default new FirestoreService();
