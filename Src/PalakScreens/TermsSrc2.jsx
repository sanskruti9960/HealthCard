import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Icons from "react-native-vector-icons/Ionicons";

const TermsSrc2 = ({navigation}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 ,justifyContent:"flex-start"}}>
            <Icons name="arrow-back" size={30} color="black" style={{ alignSelf: "center", marginBottom: 20 }} onPress={() => navigation.navigate("Terms")} />
            <Text style={styles.heading}>Terms & Conditions</Text>
        </View>
      <Text style={styles.title}>1. Introduction</Text>
      <Text style={styles.text}>
        Welcome to Health Card. This app allows users
        to securely store, manage, and access their personal health information,
        including medical history, emergency contacts, and insurance details. By
        downloading, installing, or using this app, you agree to comply with and
        be bound by these Terms & Conditions.
      </Text>

      <Text style={styles.title}>2. Acceptance of Terms</Text>
      <Text style={styles.text}>
        By using our app, you:{"\n\n"}
        • Confirm that you are at least 18 years of age or have the consent of a
        parent/guardian.{"\n"}
        • Agree to use the app only for lawful and legitimate purposes.{"\n"}
        • Accept these Terms & Conditions in full.
      </Text>

      <Text style={styles.title}>3. User Responsibilities</Text>
      <Text style={styles.text}>
        • You are responsible for providing accurate and up-to-date personal,
        medical, and insurance information.{"\n"}
        • You agree not to use this app for illegal, unauthorized, or harmful
        purposes.{"\n"}
        • You are responsible for maintaining the confidentiality of your login
        credentials.
      </Text>

      <Text style={styles.title}>4. Privacy & Data Protection</Text>
      <Text style={styles.text}>
        We are committed to protecting your privacy and securing your personal
        health data:{"\n\n"}
        • Your data is stored securely using encrypted cloud storage (e.g.,
        Firebase/Firestore).{"\n"}
        • We do not share your personal information with third parties without
        your consent, except as required by law.{"\n"}
        • For more information, please review our Privacy Policy.
      </Text>

      <Text style={styles.title}>5. Health Disclaimer</Text>
      <Text style={styles.text}>
        This app is intended only as a tool for storing and managing
        health-related information. It:{"\n\n"}
        • Does not provide medical advice, diagnosis, or treatment.{"\n"}
        • Should not be used as a substitute for professional medical advice.
        Always consult a qualified healthcare provider for any medical concerns.
      </Text>

      <Text style={styles.title}>6. Limitation of Liability</Text>
      <Text style={styles.text}>
        We are not liable for:{"\n\n"}
        • Any inaccuracies or incompleteness of the data you provide.{"\n"}
        • Loss of data due to technical failures, unauthorized access, or other
        unforeseen events.{"\n"}
        • Any direct, indirect, or consequential damages arising from the use of
        this app.
      </Text>

      <Text style={styles.title}>7. Intellectual Property Rights</Text>
      <Text style={styles.text}>
        All content, trademarks, and designs in this app belong to
        [Your Company/App Name] and are protected by applicable intellectual
        property laws. Unauthorized use, reproduction, or modification of our
        content is strictly prohibited.
      </Text>

      <Text style={styles.title}>8. Changes to Terms</Text>
      <Text style={styles.text}>
        We may update these Terms & Conditions from time to time. Continued use
        of the app after changes are published constitutes acceptance of the new
        terms.
      </Text>

      <Text style={styles.title}>9. Termination</Text>
      <Text style={styles.text}>
        We reserve the right to suspend or terminate your account if you violate
        these Terms & Conditions or misuse the app.
      </Text>

      <Text style={styles.title}>10. Contact Information</Text>
      <Text style={styles.text}>
        If you have any questions about these Terms & Conditions, please contact
        us at:{"\n"}
        Email: your-support-email@example.com{"\n"}
        Phone: your support number
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 ,paddingLeft: 10},
  title: { fontSize: 18, fontWeight: "bold", marginTop: 15, marginBottom: 5 },
  text: { fontSize: 16, lineHeight: 24 },
});

export default TermsSrc2;
