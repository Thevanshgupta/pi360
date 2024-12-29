import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from './styles'; // Import styles

const ProfileTabs = ({ activeTab, handleTabChange }) => {
  const tabs = [
    'personal', 'performance Indices', 'patents', 'research', 'projects',
    'Consultancy', , 'Research Guidance', 'Staff Training',
    'Staff Workshops', 'Staff Seminars', 'Staff Value Added Courses',
    'Staff Other Activities', 'Staff Industrial Visits', 'Staff Guest Lectures'
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => handleTabChange(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ProfileTabs;