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

const Card = ({ title, date, sno }) => {
  return (
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
  );
};

const IntellectualProperty = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    const apiUrl =
      'https://pi360.net/site/api/api_intellectual_property_list.php?institute_id=mietjammu';

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setData(response.data.content);
      } else {
        console.error(
          'Error: Unable to fetch data. Status code:',
          response.status
        );
        setData([]);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setData([]);
    }
  };

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
              <Text style={styles.section3.title}>Filing Date</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item?.Patent_Details?.Patent_Title || 'N/A'}
                date={item?.Patent_Details?.Filing_Date || 'N/A'}
                sno={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD NEW INTELLECTUAL PROPERTY INFORMATION')}>
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Uniform background
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
    height: 90,
    width: '95%',
    flexDirection: 'row',
    marginHorizontal: '2.5%',
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  titleHead: {
    height: 50,
    width: '95%',
    marginHorizontal: '2.5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  section1: {
    flex: 1.5,
    justifyContent: 'center',
    paddingLeft: 10,
    title: {
      fontWeight: 'bold',
      fontFamily: 'Raleway-Bold',
      color: '#000',
    },
  },
  section2: {
    flex: 6,
    justifyContent: 'center',
    titleMain: {
      color: '#007BFF',
      textTransform: 'capitalize',
      fontFamily: 'Raleway-Medium',
      textDecorationLine: 'underline',
    },
  },
  section3: {
    flex: 3,
    justifyContent: 'center',
    titleMain: {
      color: '#000',
      fontFamily: 'Raleway-Medium',
    },
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#28a745',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
});


export default IntellectualProperty;
