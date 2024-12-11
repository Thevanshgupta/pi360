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

const SeminarsList = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // For navigation to the new seminar page

  async function fetchData() {
    const apiUrl =
      'https://pi360.net/site/api/api_staff_development_seminars_list.php?institute_id=mietjammu';

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
              <Text style={styles.section3Title}>Duration</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item['Seminar_Detail']['Seminar_Name']}
                date={item['Seminar_Detail']['Duration']}
                sno={index + 1} // Adjust the serial number
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD NEW SEMINAR INFORMATION')} // Update with correct route for your app
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 10,  // Space from the top for better UI
  },
  LoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoadingText: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#000',
  },
  dataCard: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 10,  // Space between cards
  },
  titleHead: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    fontFamily: 'Raleway-Bold',
    backgroundColor: '#f0f0f0',
    marginBottom: 5,  // Space below title header
  },
  section1: {
    height: '100%',
    flex: 1.5,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  section1Title: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: 'black',
  },
  section2: {
    height: '100%',
    flex: 10,
    justifyContent: 'center',
  },
  section2Cent: {
    alignItems: 'center',
  },
  section2Title: {
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Raleway-Bold',
  },
  section2TitleMain: {
    color: '#007BFF',  // Blue color for seminar titles
    textTransform: 'capitalize',
    fontFamily: 'Raleway-Medium',
    textDecorationLine: 'underline',
  },
  section3: {
    height: '100%',
    flex: 3,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  section3Title: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: 'black',
  },
  section3TitleMain: {
    color: 'black',
    fontFamily: 'Raleway-Medium',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SeminarsList;
