import React from 'react';
import { View, Text, Image } from 'react-native';
import { safeGet } from './utils';
import styles from './styles'; // Import styles

const ProfileHeader = ({ userData }) => {
  const imageUrl = safeGet(userData, 'ProfilePicture');
  console.log("Image URL:", imageUrl); 
  return (
    <View style={styles.profileHeader}>
      <Image
        source={{ uri: safeGet(userData, 'ProfilePicture') }}
        
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>{safeGet(userData, 'emp_name')}</Text>
      <Text style={styles.profileInstitute}>{safeGet(userData, 'Designation')}</Text>
    </View>
  );
};

export default ProfileHeader;