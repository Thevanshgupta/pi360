import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = ({ title, date, sno, code }) => {
  const navigate = useNavigate();
  return (
    <View style={styles.dataCard}>
      <View style={styles.section1}>
        <Text style={styles.section1.title}>{sno + 1}</Text>
      </View>
      <View style={styles.section2}>
        <Text
          onPress={() => {
            navigate('/data/IndustrialVisitDetails/' + code);
          }}
          numberOfLines={3}
          style={styles.section2.titleMain}>
          {title}
        </Text>
      </View>
      <View style={styles.section3}>
        <Text style={styles.section3.titleMain}>{date}</Text>
      </View>
    </View>
  );
};

const IndustrialVisitsList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    const apiUrl =
      'https://pi360.net/site/api/api_industrial_visits_list.php?institute_id=mietjammu';

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
              <Text style={styles.section2.title}>Industrial Visit Details</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section3.title}>Date</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item['Industrial_Visit_Detail']['Company']}
                date={item['Industrial_Visit_Detail']['Date']}
                sno={index}
                code={item['Industrial_Visit_Detail']['Code']} // Assuming 'Code' is the unique identifier
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      {/* Add New Industrial Visit Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD NEW INDUSTRIAL VISIT')}>
        <Icon name="plus" size={30} color="#fff" />
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
    float: 'left',
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
    backgroundColor: '#0000FF', // Dark blue for the add button
    borderRadius: 90,
    padding: 17,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});

export default IndustrialVisitsList;
