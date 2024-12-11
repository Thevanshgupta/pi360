import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigate } from 'react-router-native'; // Assuming React Router is being used
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = ({ title, date, sno, code }) => {
  const navigate = useNavigate();

  return (
    <TouchableOpacity onPress={() => navigate(`/data/ConferenceDetails/${code}`)}>
      <View style={styles.dataCard}>
        <View style={styles.section1}>
          <Text style={styles.section1.title}>{sno + 1}</Text>
        </View>
        <View style={styles.section2}>
          <Text numberOfLines={3} style={styles.section2.titleMain}>
            {title}
          </Text>
        </View>
        <View style={styles.section3}>
          <Text style={styles.section3.titleMain}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ConferenceList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch data
  async function fetchData() {
    const apiUrl = 'https://pi360.net/site/api/api_staff_development_conference_list.php?institute_id=mietjammu';

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setData(response.data.content);
      } else {
        console.error('Error: Unable to fetch data. Status code:', response.status);
        setError('Failed to load data');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (data === null) {
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
              <Text style={styles.section2.title}>Title</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section3.title}>Filing Date</Text>
            </View>
          </View>

          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item['Patent_Details']['Patent_Title']}
                date={item['Patent_Details']['Filing_Date']}
                sno={index}
                code={item['Patent_Details']['Code']} // Assuming you have a code field to pass for navigation
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD NEW CONFERENCE INFORMATION')}
      >
        <Text style={styles.addButtonText}>Add</Text>
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
    flex: 1.5,
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
    flex: 10,
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
    right: 20,
    backgroundColor: '#007BFF', // A vibrant blue
    width: 70, // Adjust width for better proportion
    height: 70, // Adjust height for a more circular look
    borderRadius: 35, // Half of width/height to make it perfectly circular
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Adds shadow for Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.3, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
  },
  
  addButtonText: {
    color: '#fff', // White text color for contrast
    fontSize: 24, // Larger text to make the button more noticeable
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
    fontWeight: 'bold', // Ensure the text stands out
    lineHeight: 30, // Adjust line height for vertical centering
  }
  
});

export default ConferenceList;
