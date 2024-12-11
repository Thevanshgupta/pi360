import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
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
            navigate('/data/GuestLecturesDetails/' + code);
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

const GuestLecturesList = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    const apiUrl =
      'https://pi360.net/site/api/api_industrial_visits_list.php?institute_id=mietjammu';

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setData(response.data.content);
      } else {
        console.error(
          'Error: Unable to fetch data. Status code:',
          response.status,
        );
        return null;
      }
    } catch (error) {
      console.error('Error:', error.message);
      setData(404);
    }
  }

  useEffect(() => {
    if (data === null) {
      fetchData();
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {data === null ? (
        <View style={styles.LoadingContainer}>
          <Text style={styles.LoadingContainer.text}>Loading...</Text>
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
              <Text style={styles.section3.title}>Starting Date</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                sno={index}
                title={item?.title || 'N/A'}
                date={item?.date || 'N/A'}
                code={item?.code || 'N/A'}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      {/* Add New Guest Lecture Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD NEW GUEST LECTURE')}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Light background for better contrast
  },
  LoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataCard: {
    height: 90,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  titleHead: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#D3D3D3', // Dark grey header
    borderRadius: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  section1: {
    flex: 1.5,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  section2: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section3: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    backgroundColor: '#0000FF', // Dark grey for button
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
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  section2Title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  section3Title: {
    fontSize: 16,
    color: '#888',
  },
});

export default GuestLecturesList;
