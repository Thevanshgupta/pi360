import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = ({ title, date, sno, code }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.dataCard}>
      <View style={styles.section1}>
        <Text style={styles.section1Title}>{sno + 1}</Text>
      </View>
      <View style={styles.section2}>
        <Text
          onPress={() => {
            navigate(`/data/ProjectDetails/${code}`);
          }}
          numberOfLines={3}
          style={styles.section2TitleMain}
        >
          {title}
        </Text>
      </View>
      <View style={styles.section3}>
        <Text style={styles.section3TitleMain}>{date}</Text>
      </View>
    </View>
  );
};

const ProjectList = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    const apiUrl =
      'https://pi360.net/site/api/api_project_list.php?institute_id=mietjammu';

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setData(response.data.content);
      } else {
        console.error('Error: Unable to fetch data. Status code:', response.status);
        setData([]);
      }
    } catch (error) {
      console.error('Error:', error.message);
      setData([]);
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
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <>
          <View style={styles.titleHead}>
            <View style={styles.section1}>
              <Text style={styles.section1Title}>S No.</Text>
            </View>
            <View style={[styles.section2, styles.centerAlign]}>
              <Text style={styles.section2Title}>Title</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section3Title}>Starting Date</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item.Patent_Details.Project_Title}
                date={item.Patent_Details.Started_On}
                sno={index}
                code={item.Patent_Details.Code}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD NEW PROJECT/GRANT INFORMATION')}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#000',
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
    backgroundColor: '#D3D3D3',
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
  centerAlign: {
    alignItems: 'center',
  },
  section1Title: {
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
    color: 'black',
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
    right: 30,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default ProjectList;
