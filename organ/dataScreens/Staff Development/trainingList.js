import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Card = ({ title, date, sno, code }) => {
  const navigate = useNavigate();

  return (
    <TouchableOpacity onPress={() => navigate('/data/EContentDetails/' + code)}>
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

const TrainingList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    const apiUrl = 'https://pi360.net/site/api/api_staff_development_training_list.php?institute_id=mietjammu';

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setData(response.data.content);
      } else {
        console.error('Error: Unable to fetch data. Status code:', response.status);
        setError('Unable to fetch data');
      }
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
        <View style={styles.ErrorContainer}>
          <Text style={styles.ErrorContainer.text}>Error: {error}</Text>
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
                title={item['Training_Detail']['Training_Name']}
                date={item['Training_Detail']['Duration']}
                sno={index}
                code={item['Training_Detail']['Code']}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD NEW TRAINING INFORMATION')}
      >
        <Icon name="plus" size={30} color="#fff" />
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
    text: {
      fontSize: 18,
      fontFamily: 'Raleway-Bold',
      color: '#4e5d6c', // Slightly muted text for better visibility
    },
  },
  ErrorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    text: {
      fontSize: 18,
      fontFamily: 'Raleway-Bold',
      color: '#d9534f', // Red error message
    },
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
    title: {
      fontWeight: 'bold',
      fontFamily: 'Raleway-Bold',
      color: '#333',
    },
  },
  section2: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    cent: {
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
      color: '#333',
      fontFamily: 'Raleway-Bold',
    },
    titleMain: {
      fontSize: 16,
      color: '#007bff',
      textTransform: 'capitalize',
      fontFamily: 'Raleway-Medium',
      textDecorationLine: 'underline',
    },
  },
  section3: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 10,
    title: {
      fontWeight: 'bold',
      fontFamily: 'Raleway-Bold',
      color: '#333',
    },
    titleMain: {
      color: '#333',
      fontFamily: 'Raleway-Medium',
    },
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
});

export default TrainingList;
