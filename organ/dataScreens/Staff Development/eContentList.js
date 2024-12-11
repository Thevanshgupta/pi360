import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native'; // Assuming React Router is being used
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Card = ({ title, date, sno, code }) => {
  const navigate = useNavigate();

  return (
    <TouchableOpacity onPress={() => navigate('/data/EContentDetails/' + code)}>
      <View style={styles.dataCard}>
        <View style={styles.section1}>
          <Text style={styles.section1Title}>{sno + 1}</Text>
        </View>
        <View style={[styles.section2, styles.section2Cent]}>
          <Text numberOfLines={3} style={styles.section2TitleMain}>
            {title}
          </Text>
        </View>
        <View style={styles.section3}>
          <Text style={styles.section3TitleMain}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const EcontentList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    const apiUrl = 'https://pi360.net/site/api/api_staff_e_content_list.php?institute_id=mietjammu';

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
          <Text style={styles.LoadingText}>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.LoadingContainer}>
          <Text style={styles.LoadingText}>Error: {error}</Text>
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
              <Text style={styles.section3Title}>Launched On</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item['Content_Detail']['Module_Name']}
                date={item['Content_Detail']['Launched_On']}
                sno={index}
                code={item['Content_Detail']['Code']}
              />
            )}
            keyExtractor={(item, index) => item['Content_Detail']['Code'].toString()}
          />
        </>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/Add e-Content')}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingBottom: 20, // Space for the floating button
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
    height: 90,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginVertical: 5, // Vertical space between cards
    borderRadius: 8, // Rounded corners for the card
    elevation: 3, // Shadow for the card
  },
  titleHead: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  section1: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  section1Title: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: 'black',
  },
  section2: {
    flex: 8,
    justifyContent: 'center',
    paddingLeft: 10,
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
    color: 'blue',
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
});

export default EcontentList;
