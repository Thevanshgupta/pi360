import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';



const ResearchGate = () => {
  // Sample data for items
  const items = [
    { id: '1', title: 'Research Publication', imageUri: 'https://demo.pi360.net/site/images/higherstudies.png' },
    { id: '2', title: 'Intellectual Property', imageUri: 'https://demo.pi360.net/site/images/patent.png' },
    { id: '3', title: 'Projects/Grants', imageUri: 	'https://demo.pi360.net/site/images/patent.png' },
    { id: '4', title: 'Consultancy/Corporate Training', imageUri: 'https://demo.pi360.net/site/images/patents.png' },
    { id: '5', title: 'Book Publication', imageUri: 'https://demo.pi360.net/site/images/books3-stacked.png' },
    { id: '6', title: 'Research Guidance', imageUri: 	'https://demo.pi360.net/site/images/academics.png' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Research</Text>
      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.imageUri }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#004080',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ResearchGate;
