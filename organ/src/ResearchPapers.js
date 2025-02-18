import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { safeGet } from '../src/utils';
import styles from './styles';

const ResearchPapers = ({ userData, titles }) => {
  const navigate = useNavigate();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Research Papers</Text>
      <View style={styles.card}>
        {userData.ResearchPapers && userData.ResearchPapers.length > 0 ? (
          userData.ResearchPapers.map((paper, index) => {
            const researchCode = safeGet(paper, 'researchCode');
            const titleKey = `research-${researchCode}`;
            return (
              <View key={index} style={styles.buttonContainer}>
                <Text style={styles.indexText}>{index + 1}.</Text>
                <TouchableOpacity
                  onPress={() => { navigate(`/data/ResearchDetails/${researchCode}`) }}
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
          <Text style={styles.sectionContent}>No Research Papers available.</Text>
        )}
      </View>
    </View>
  );
};

export default ResearchPapers;