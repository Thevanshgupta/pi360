import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-native'; // Assuming React Router is being used for navigation

const Card = ({ title, date, sno }) => {
  return (
    <View style={styles.dataCard}>
      <View style={styles.section1}>
        <Text style={styles.section1Title}>{sno}</Text>
      </View>
      <View style={styles.section2}>
        <Text numberOfLines={3} style={styles.section2TitleMain}>
          {title}
        </Text>
      </View>
      <View style={styles.section3}>
        <Text style={styles.section3TitleMain}>{date}</Text>
      </View>
    </View>
  );
};

const WorkshopList = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // For navigation to the new workshop page

  async function fetchData() {
    const apiUrl =
      'https://pi360.net/site/api/api_staff_development_workshops_list.php?institute_id=mietjammu';

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setData(response.data.content);
      } else {
        console.error('Error: Unable to fetch data. Status code:', response.status);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setData(404); // Return 404 if data fetching fails
    }
  }

  useEffect(() => {
    fetchData();
  }, []); // Only fetch data once when the component mounts

  return (
    <View style={styles.container}>
      {data === null ? (
        <View style={styles.LoadingContainer}>
          <Text style={styles.LoadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.titleHead}>
            <View style={styles.section1}>
              <Text style={styles.section1Title}>S No.</Text>
            </View>
            <View style={[styles.section2, styles.section2Cent]}>
              <Text style={styles.section2Title}>Title</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section3Title}>Filing Date</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item['Workshop_Detail']['Workshop_Name']}
                date={item['Workshop_Detail']['Duration']}
                sno={index + 1} // Adjust the serial number
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      {/* Add New Workshop Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD NEW WORKSHOP INFORMATION')} // Navigate to Add New Workshop page
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f7fa', // Light background for clean look
  },
  LoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoadingText: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#4e5d6c', // Slightly muted text for better visibility
  },
  dataCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    flexDirection: 'row',
    elevation: 2,
  },
  titleHead: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#e9f0f7', // Subtle background color for header
    borderRadius: 8,
  },
  section1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  section1Title: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: '#333',
  },
  section2: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  section2Cent: {
    alignItems: 'center',
  },
  section2Title: {
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Raleway-Bold',
  },
  section2TitleMain: {
    fontSize: 16,
    color: '#007bff',
    textTransform: 'capitalize',
    fontFamily: 'Raleway-Medium',
    textDecorationLine: 'underline',
  },
  section3: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  section3Title: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: '#333',
  },
  section3TitleMain: {
    color: '#333',
    fontFamily: 'Raleway-Medium',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
  },
});

export default WorkshopList;
