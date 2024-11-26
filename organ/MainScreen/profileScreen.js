import React from 'react';
import { View, Text, Image, Linking, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Sample user data; replace this with actual dynamic data from a database or API.
const userData = {
  image: 'https://via.placeholder.com/150', // Replace with dynamic image URL
  bio: 'This is a sample bio describing the user and their qualifications and interests.',
  department: 'P.G. Department of Management Studies',
  designation: 'Lecturer',
  linkedin: 'https://www.linkedin.com',
  researchGate: 'https://www.researchgate.net',
  orcidID: '0000-0001-2345-6789',
  researcherID: '123456',
  scopusID: 'https://www.scopus.com',
  googleScholar: 'https://scholar.google.com',
  vidwan: 'https://vidwan.in',
  downloadLinks: {
    calendarYear: 'https://example.com/calendar-year.pdf',
    academicYear: 'https://example.com/academic-year.pdf',
    calendarYearDetailed: 'https://example.com/calendar-year-detailed.pdf',
    academicYearDetailed: 'https://example.com/academic-year-detailed.pdf',
  },
};

const ProfileScreen = ({ user = userData }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Profile Image */}
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: user.image }}
          style={styles.profileImage}
        />
      </View>

      {/* Profile Info */}
      <View style={styles.infoContainer}>
        <ProfileRow label="Bio" value={user.bio} />
        <ProfileRow label="Department" value={user.department} />
        <ProfileRow label="Designation" value={user.designation} />
        <ProfileLink label="LinkedIn Profile" url={user.linkedin} />
        <ProfileLink label="ResearchGate Profile" url={user.researchGate} />
        <ProfileRow label="ORCID ID" value={user.orcidID} />
        <ProfileRow label="Researcher ID" value={user.researcherID} />
        <ProfileLink label="Scopus ID" url={user.scopusID} />
        <ProfileLink label="Google Scholar" url={user.googleScholar} />
        <ProfileLink label="Vidwan Profile" url={user.vidwan} />

        {/* Download Links */}
        <View style={styles.downloadSection}>
          <Text style={styles.downloadLabel}>Download Profile Highlights:</Text>
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => Linking.openURL(user.downloadLinks.calendarYear)}>
              <Text style={styles.linkText}>Calendar Year</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(user.downloadLinks.academicYear)}>
              <Text style={styles.linkText}>Academic Year</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={() => Linking.openURL(user.downloadLinks.calendarYearDetailed)}>
              <Text style={styles.linkText}>Calendar Year Detailed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(user.downloadLinks.academicYearDetailed)}>
              <Text style={styles.linkText}>Academic Year Detailed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const ProfileRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const ProfileLink = ({ label, url }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <Text style={styles.link}>{url}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
  },
  value: {
    width: '60%',
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  downloadSection: {
    marginTop: 20,
  },
  downloadLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  linkText: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});

export default ProfileScreen;
