import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigate } from 'react-router-native';

const Card = ({ title, date, sno }) => (
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

const MembershipList = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    const apiUrl =
      'https://pi360.net/site/api/api_staff_memberships_list.php?institute_id=mietjammu';

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setData(response.data.content);
      } else {
        console.error('Error: Unable to fetch data. Status code:', response.status);
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
              <Text style={styles.section3.title}>Member From</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                sno={index}
                title={item["Membership_Detail"]["Membership Details"]}
                date={item["Membership_Detail"]["Member_From"]}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      {/* Add New Membership Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD NEW MEMBERSHIP INFORMATION')}
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
    title: {
      fontWeight: 'bold',
      color: 'black',
    },
  },
  section2: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    title: {
      fontWeight: 'bold',
      color: 'black',
    },
    titleMain: {
      color: 'blue',
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
    backgroundColor: '#0000FF',
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

export default MembershipList;
