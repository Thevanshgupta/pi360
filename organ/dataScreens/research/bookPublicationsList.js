import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigate } from 'react-router-native';
import axios from 'axios';

// Reusable Card Component
const Card = ({ title, date, sno, code }) => {
  const navigate = useNavigate();

  return (
    <TouchableOpacity
      onPress={() => navigate('/data/BookDetails/' + code)}
      accessibilityLabel={`Book details for ${title}`}
      accessibilityHint="Navigates to the details page of this book"
    >
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.cardLeftText}>{sno + 1}</Text>
        </View>
        <View style={styles.cardCenter}>
          <Text numberOfLines={3} style={styles.cardTitle}>{title}</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.cardDate}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Main Component
const BookPublicationsList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch Data
  const fetchData = async () => {
    const apiUrl =
      'https://pi360.net/site/api/api_books_publication_list.php?institute_id=mietjammu';

    try {
      const response = await axios.get(apiUrl);
      setData(response.data.content);
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Error: {error}</Text>
          <TouchableOpacity onPress={fetchData} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerText}>S No.</Text>
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.headerText}>Book Title</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerText}>Published On</Text>
            </View>
          </View>

          {/* Book List */}
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card
                title={item['Book_List']['Book_Title']}
                date={item['Book_List']['Published_On']}
                sno={index}
                code={item['Book_List']['Code']}
              />
            )}
            keyExtractor={(item) => item['Book_List']['Code']}
          />

          {/* Add Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigate('/data/ADD NEW BOOK PUBLICATION')}
          >
            <Icon name="plus" size={30} color="#fff" />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

// Styles
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
    color: '#007BFF',
  },
  retryButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
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
    paddingLeft: 15,
  },
  headerCenter: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 15,
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
    flex: 4,
    justifyContent: 'center',
    paddingHorizontal: 15,
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
    alignItems: 'center',
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

export default BookPublicationsList;
