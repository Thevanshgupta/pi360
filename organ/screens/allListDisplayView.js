import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigate } from 'react-router-native';

const Card = ({ title, path }) => {
  const navigate = useNavigate();
  return (
    <TouchableOpacity
      style={styles.dataCard}
      onPress={() => {
        navigate(path);
      }}
    >
      <View style={[styles.section2, styles.section2.cent]}>
        <Text numberOfLines={3} style={styles.section2.titleMain}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const AllListDisplayView = () => {
  const ListScreens = [
    { name: 'Research List', path: '/data/ResearchList/' },
    { name: 'IntellectualProperty', path: '/data/IntellectualProperty' },
    { name: 'Project List', path: '/data/projectlist' },
    { name: 'Consultancy List', path: '/data/ConsultancyList' },
    { name: 'Book Publications List', path: '/data/BookPublicationsList' },
    { name: 'Research Guidance List', path: '/data/researchguidanceList/' },
    { name: 'Training List', path: '/data/TrainingList' },
    { name: 'Workshop List', path: '/data/WorkshopList' },
    { name: 'SeminarsList', path: '/data/SeminarsList' },
    { name: 'Conference List', path: '/data/ConferenceList' },
    { name: 'Extension Lectures List', path: '/data/ExtensionLecturesList' },
    { name: 'Membership List', path: '/data/MembershipList' },
    { name: 'Econtent List', path: '/data/EcontentList' },
    { name: 'Guest Lectures List', path: '/data/GuestLecturesList' },
    { name: 'Industrial Visits List', path: '/data/IndustrialVisitsList' },
    { name: 'Value Added Cources List', path: '/data/ValueAddedCourcesList' },
    { name: 'Other Activities List', path: '/data/OtherActivitiesList' },
    { name: 'Staff Achievements List', path: '/data/StaffAchievementsList' },
    { name: 'Student Achievements List', path: '/data/StudentAchievementsList' },
    { name: 'Entrepreneurship List', path: '/data/EntrepreneurshipList' },
    { name: 'Higher Studies List', path: '/data/HigherStudiesList' },
    { name: 'Internship List', path: '/data/InternshipList' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {ListScreens.map((data, index) => (
          <Card key={index} title={data.name} path={data.path} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  dataCard: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section2: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    titleMain: {
      color: 'black',
      textTransform: 'capitalize',
      fontSize: 18,
      fontFamily: 'Raleway-Medium',
    },
  },
});

export default AllListDisplayView;
