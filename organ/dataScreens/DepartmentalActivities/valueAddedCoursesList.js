import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-native'; // Import the useNavigate hook for navigation

const Card = ({ title, date, sno }) => (
  <View style={styles.dataCard}>
    <View style={styles.section1}>
      <Text style={styles.section1.title}>{sno + 1}</Text>
    </View>
    <View style={[styles.section2, styles.section2.cent]}>
      <Text numberOfLines={3} style={styles.section2.titleMain}>
        {title}
      </Text>
    </View>
    <View style={styles.section3}>
      <Text style={styles.section3.titleMain}>{date}</Text>
    </View>
  </View>
);

const ValueAddedCourcesList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigation hook

  async function fetchData() {
    const apiUrl =
      'https://pi360.net/site/api/api_dept_value_added_courses_list.php?institute_id=mietjammu';
    try {
      const response = await axios.get(apiUrl);
      setData(response.data.content);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.LoadingContainer}>
          <Text style={styles.LoadingContainer.text}>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.LoadingContainer}>
          <Text style={styles.LoadingContainer.text}>Error: {error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.titleHead}>
            <View style={styles.section1}>
              <Text style={styles.section1.title}>S No.</Text>
            </View>
            <View style={[styles.section2, styles.section2.cent]}>
              <Text style={styles.section2.title}>Value Added Courses</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section3.title}>Date</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item['Value_Added_Course_Detail']['Value_Added_Course']}
                date={item['Value_Added_Course_Detail']['Date']}
                sno={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      {/* Add New Value Added Course Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/AddNewValueAddedCourse')} // Navigate to the Add New Value Added Course page
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  LoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    text: {
      fontSize: 20,
      fontFamily: 'Raleway-Bold',
      color: '#000',
    },
  },
  dataCard: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  titleHead: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    fontFamily: 'Raleway-Bold',
  },
  section1: {
    height: '100%',
    flex: 1.3,
    borderColor: '#ccc',
    paddingLeft: 20,
    justifyContent: 'center',
    title: {
      fontWeight: 'bold',
      fontFamily: 'Raleway-Bold',
      color: 'black',
    },
  },
  section2: {
    height: '100%',
    flex: 8,
    justifyContent: 'center',
    cent: {
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      color: 'black',
      fontFamily: 'Raleway-Bold',
    },
    titleMain: {
      color: 'blue',
      textTransform: 'capitalize',
      fontFamily: 'Raleway-Medium',
      textDecorationLine: 'underline',
    },
  },
  section3: {
    height: '100%',
    flex: 3,
    paddingLeft: 20,
    justifyContent: 'center',
    title: {
      fontWeight: 'bold',
      fontFamily: 'Raleway-Bold',
      color: 'black',
    },
    titleMain: {
      color: 'black',
      fontFamily: 'Raleway-Medium',
    },
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: '#007BFF', // Blue background for the add button
    borderRadius: 60,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Raleway-Bold',
  },
});

export default ValueAddedCourcesList;
