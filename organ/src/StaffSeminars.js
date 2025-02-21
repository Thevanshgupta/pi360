import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { safeGet } from '../src/utils';
import styles from './styles';

const StaffSeminars = ({ userData, titles }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Staff Seminars</Text>
      <View style={styles.card}>
        {userData.StaffSeminars && userData.StaffSeminars.length > 0 ? (
          userData.StaffSeminars.map((seminar, index) => {
            const seminarCode = safeGet(seminar, 'seminarCode');
            const titleKey = `seminar-${seminarCode}`;
            return (
              <View key={index} style={styles.buttonContainer}>
                <Text style={styles.indexText}>{index + 1}.</Text>
                <TouchableOpacity
                  onPress={() => { navigate(`/data/SeminarsDetails/${seminarCode}`) }}
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
          <Text style={styles.sectionContent}>No seminars available.</Text>
        )}
      </View>
    </View>
  );
};

export default StaffSeminars;