import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Button, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-native';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = () => {
  const {userData} = useAuth()
  const [activeTab, setActiveTab] = useState('personal'); // Default to "personal" tab
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const safeGet = (obj, path, fallback = 'N/A') => {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
      result = result ? result[key] : undefined;
    }
    return result !== undefined ? result : fallback;
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const openURL = (url) => {
    if (url && url !== 'N/A') {
      Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    }
  };

  if (!userData) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Fetching your profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: safeGet(userData, 'ProfilePicture') }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>{safeGet(userData, 'username_1')}</Text>
          <Text style={styles.profileInstitute}>{safeGet(userData, 'UG_Institute')}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          {['personal', 'performance', 'patents', 'research', 'projects'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => handleTabChange(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {activeTab === 'personal' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <View style={styles.card}>
              <Text style={styles.sectionContent}>Gender: {safeGet(userData, 'Gender')}</Text>
              <Text style={styles.sectionContent}>DOB: {safeGet(userData, 'DOB')}</Text>
              <Text style={styles.sectionContent}>Designation: {safeGet(userData, 'Designation')}</Text>
              <Text style={styles.sectionContent}>Bio: {safeGet(userData, 'Bio')}</Text>
              <Text style={styles.sectionContent}>City: {safeGet(userData, 'City')}</Text>
              <Text style={styles.sectionContent}>LinkedIn: 
                <TouchableOpacity onPress={() => openURL(safeGet(userData, 'LinkedIn'))}>
                  <Text style={styles.linkText} numberOfLines={1}>{safeGet(userData, 'LinkedIn')}</Text>
                </TouchableOpacity>
              </Text>
              <Text style={styles.sectionContent}>ResearchGate: 
                <TouchableOpacity onPress={() => openURL(safeGet(userData, 'ResearchGate'))}>
                  <Text style={styles.linkText} numberOfLines={1}>{safeGet(userData, 'ResearchGate')}</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'performance' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Performance</Text>
            <View style={styles.card}>
              <Text style={styles.sectionContent}>Academics: {safeGet(userData, 'PerformanceAcademics.average_index')}</Text>
              <Text style={styles.sectionContent}>Achievements: {safeGet(userData, 'PerformanceAchievements.average_index')}</Text>
              <Text style={styles.sectionContent}>Research: {safeGet(userData, 'PerformanceResearch.average_index')}</Text>
              <Text style={styles.sectionContent}>Staff Development: {safeGet(userData, 'PerformanceStaffDevelopment.average_index')}</Text>
            </View>
          </View>
        )}

        {activeTab === 'patents' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Patents</Text>
            <View style={styles.card}>
              {userData.Patents && userData.Patents.length > 0 ? (
                userData.Patents.map((patent, index) => (
                  <Text key={index} style={styles.sectionContent}>
                    Patent Code: <Button onPress={() => { navigate(`/data/IntellectualPropertyDetail/${safeGet(patent, 'patentCode')}`) }} title={safeGet(patent, 'patentCode')} />
                  </Text>
                ))
              ) : (
                <Text style={styles.sectionContent}>No Patents available.</Text>
              )}
            </View>
          </View>
        )}

        {activeTab === 'research' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research Papers</Text>
            <View style={styles.card}>
              {userData.ResearchPapers && userData.ResearchPapers.length > 0 ? (
                userData.ResearchPapers.map((paper, index) => (
                  <Text key={index} style={styles.sectionContent}>
                    Research Code: <Button onPress={() => { navigate(`/data/ResearchDetails/${safeGet(paper, 'researchCode')}`) }} title={safeGet(paper, 'researchCode')} />
                  </Text>
                ))
              ) : (
                <Text style={styles.sectionContent}>No Research Papers available.</Text>
              )}
            </View>
          </View>
        )}

        {activeTab === 'projects' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            <View style={styles.card}>
              {userData.Projects && userData.Projects.length > 0 ? (
                userData.Projects.map((project, index) => (
                  <Text key={index} style={styles.sectionContent}>
                    Project Code: <Button onPress={() => { navigate(`/data/ProjectDetails/${safeGet(project, 'projectCode')}`) }} title={safeGet(project, 'projectCode')} />
                  </Text>
                ))
              ) : (
                <Text style={styles.sectionContent}>No Projects available.</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC', // Light background color for a soothing effect
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#6C63FF',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'Arial', // Modern, clean font
  },
  profileInstitute: {
    fontSize: 18,
    color: '#777',
    fontFamily: 'Arial',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 10,
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 18,
    color: '#555',
    fontFamily: 'Arial', // Use a modern, sans-serif font
  },
  activeTab: {
    borderBottomColor: '#6C63FF',
  },
  activeTabText: {
    color: '#6C63FF',
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Arial',
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    fontFamily: 'Arial',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkText: {
    color: '#6C63FF',
    textDecorationLine: 'underline',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#6C63FF',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});

export default ProfileScreen;
