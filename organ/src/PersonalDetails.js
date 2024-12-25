import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Or your preferred icon set
import Icon from 'react-native-vector-icons/FontAwesome';
import { safeGet } from '../src/utils'; 

const PersonalDetails = ({ userData }) => {
  const openURL = (url) => {
    if (url && url !== 'N/A') {
      Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Personal Details</Text>
      <View style={styles.card}>
        {/* Use DetailRow for consistent styling of detail items */}
        <DetailRow label="Name" value={safeGet(userData, 'emp_name')} />
        <DetailRow label="Gender" value={safeGet(userData, 'Gender')} />
        <DetailRow label="DOB" value={safeGet(userData, 'DOB')} />
        <DetailRow label="Designation" value={safeGet(userData, 'Designation')} />
        <DetailRow label="Bio" value={safeGet(userData, 'Bio')} />
        {/* <DetailRow label="Emp Code" value={safeGet(userData, 'emp_code')} /> */}
        <DetailRow label="City" value={safeGet(userData, 'City')} />
        <DetailRow label="State" value={safeGet(userData, 'State')} />
        <DetailRow label="ORCID iD" value={safeGet(userData, 'orcid_id')} />
        <DetailRow label="WoS Researcher ID" value={safeGet(userData, 'wos_researcher_id')} />
        <DetailRow label="Scopus ID" value={safeGet(userData, 'scopus_id')} />

        {/* LinkedIn Link with Icon */}
        <DetailRow label="LinkedIn">
          <TouchableOpacity onPress={() => openURL(safeGet(userData, 'LinkedIn'))} style={styles.linkContainer}>
            <Icon name="linkedin" size={18} color="#0077b5" style={styles.icon} />
            <Text style={styles.linkText} numberOfLines={1}>
              {safeGet(userData, 'LinkedIn') || 'N/A'}
            </Text>
          </TouchableOpacity>
        </DetailRow>

        {/* ResearchGate Link with Icon */}
        <DetailRow label="ResearchGate">
          <TouchableOpacity onPress={() => openURL(safeGet(userData, 'ResearchGate'))} style={styles.linkContainer}>
            <Icon name="user-circle" size={18} color="#0077b5" style={styles.icon}/>
            <Text style={styles.linkText} numberOfLines={1}>
              {safeGet(userData, 'ResearchGate') || 'N/A'}
            </Text>
          </TouchableOpacity>
        </DetailRow>
      </View>
    </View>
  );
};

// Helper component to display each detail row
const DetailRow = ({ label, value, children }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}:</Text>
    {children || <Text style={styles.detailValue}>{value || 'N/A'}</Text>}
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50', // Darker blue
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4, // For Android
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center', // Align items vertically
  },
  detailLabel: {
    fontWeight: '600',
    color: '#34495e', // Slightly darker text
    marginRight: 5,
    flex: 0.4
  },
  detailValue: {
    color: '#2c3e50',
    flex: 0.6
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.6
  },
  icon: {
    marginRight: 5,
  },
  linkText: {
    color: '#0077b5',
    textDecorationLine: 'underline',
  },
});

export default PersonalDetails;