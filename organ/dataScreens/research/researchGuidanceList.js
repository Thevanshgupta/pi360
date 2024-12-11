import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome for the plus icon
import axios from 'axios';

const Card = ({ title, date, sno, code }) => {
  const navigate = useNavigate();

  return (
    <TouchableOpacity onPress={() => navigate('/data/ResearchGuidanceDetails/' + code)}>
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardLeftText}>{sno + 1}</Text>
        </View>
        <View style={[styles.cardCenter, styles.cardCenterCenter]}>
          <Text numberOfLines={3} style={styles.cardTitle}>
            {title}
          </Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardDate}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ResearchGuidanceList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data from API
  async function fetchData() {
    const apiUrl = 'https://pi360.net/site/api/api_research_guide_list.php?institute_id=mietjammu';

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
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Error: {error}</Text>
        </View>
      ) : (
        <>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerText}>S No.</Text>
            </View>
            <View style={[styles.headerCenter, styles.headerCenterCenter]}>
              <Text style={styles.headerText}>Thesis Title</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerText}>Scholar Name</Text>
            </View>
          </View>

          {/* FlatList to render items */}
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item['Guide_Details']['Thesis_Title']}
                date={item['Guide_Details']['Scholar_Name']}
                sno={index}
                code={item['Guide_Details']['Code']}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}

      {/* Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('/data/ADD RESEARCH GUIDANCE')}
      >
        <Icon name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F5F7', // Light background for a cleaner look
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#007BFF',
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  headerCenter: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  headerText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 16,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLeftText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  cardCenter: {
    flex: 5,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  cardCenterCenter: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#333',
    textTransform: 'capitalize',
    textDecorationLine: 'underline',
  },
  cardRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
  },
  cardDate: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Raleway-Regular',
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
  },
});

export default ResearchGuidanceList;
