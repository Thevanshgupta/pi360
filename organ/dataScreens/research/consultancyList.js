import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome for the plus icon
import axios from 'axios';

const Card = ({ title, date, sno, code }) => {
  const navigate = useNavigate();

  return (
    <TouchableOpacity onPress={() => navigate('/data/ConsultancyDetails/' + code)}>
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
    </TouchableOpacity>
  );
};

const ConsultancyList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    const apiUrl = 'https://pi360.net/site/api/api_consultancy_list.php?institute_id=mietjammu';

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
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingContainer.text}>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingContainer.text}>Error: {error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.titleHead}>
            <View style={styles.section1}>
              <Text style={styles.section1.title}>S No.</Text>
            </View>
            <View style={[styles.section2, styles.section2.cent]}>
              <Text style={styles.section2.title}>Organization Name</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section3.title}>Starting Date</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item['Consultancy_Details']['Consultancy_Provided']}
                date={item['Consultancy_Details']['Started_On']}
                sno={index}
                code={item['Consultancy_Details']['Code']}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/CONSULTANCY/CORPORATE TRAINING INFORMATION')}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light background for consistency
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingContainerText: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#007BFF', // Blue text color
  },
  dataCard: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff', // White background for each card
    marginVertical: 5, // Space between cards
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow effect for elevation
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Android shadow effect
  },
  titleHead: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  section1: {
    flex: 1.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    borderRightWidth: 0.5,
    borderColor: '#ccc',
  },
  section1Title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: '#000',
  },
  section2: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section2Title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: '#000',
  },
  section2TitleMain: {
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    color: '#007BFF', // Blue color for main title
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
    textAlign: 'center', // Center the text
  },
  section3: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.5,
    borderColor: '#ccc',
  },
  section3Title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: '#000',
  },
  section3TitleMain: {
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    color: '#000',
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
    elevation: 4, // Elevation for the button shadow
  },
});

export default ConsultancyList;
