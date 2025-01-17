import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { safeGet } from '../src/utils';
import styles from './styles';

const Projects = ({ userData, titles }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Projects</Text>
      <View style={styles.card}>
        {userData.Projects && userData.Projects.length > 0 ? (
          userData.Projects.map((project, index) => {
            const projectCode = safeGet(project, 'projectCode');
            const titleKey = `project-${projectCode}`;
            return (
              <View key={index} style={styles.buttonContainer}>
                <Text style={styles.indexText}>{index + 1}.</Text>
                <TouchableOpacity
                  onPress={() => { navigate(`/data/ProjectDetails/${projectCode}`) }}
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
          <Text style={styles.sectionContent}>No Projects available.</Text>
        )}
      </View>
    </View>
  );
};

export default Projects;