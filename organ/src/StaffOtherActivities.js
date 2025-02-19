import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { safeGet } from '../src/utils';
import styles from './styles';

const StaffOtherActivities = ({ userData, titles }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Staff Other Activities</Text>
      <View style={styles.card}>
        {userData.StaffOtherActivities && userData.StaffOtherActivities.length > 0 ? (
          userData.StaffOtherActivities.map((activity, index) => {
            const activityCode = safeGet(activity, 'activityCode');
            const titleKey = `otherActivity-${activityCode}`;
            return (
              <View key={index} style={styles.buttonContainer}>
                <Text style={styles.indexText}>{index + 1}.</Text>
                <TouchableOpacity
                  onPress={() => { navigate(`/data/OtherActivitiesDetails/${activityCode}`) }}
                  style={[styles.button, !titles[titleKey] && styles.disabledButton]}
                  disabled={!titles[titleKey]}
                >
                  <Text style={styles.buttonText}>
                    {titles[titleKey] || 'Loading...'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text style={styles.sectionContent}>No other activities available.</Text>
        )}
      </View>
    </View>
  );
};

export default StaffOtherActivities;