import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Fragment,
} from 'react-native';
import axios from 'axios';
import { useParams } from 'react-router-native';

const Card = ({ title, data }) => {
  // --- START: Changes allowed ONLY within the Card component ---
  const handleLinkPress = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  const renderData = () => {
    // Handle "Paper URL" and "Acceptance Proof" as clickable links
    if ((title === 'Paper URL' || title === 'Acceptance Proof') && typeof data === 'string' && (data.startsWith('http://') || data.startsWith('https://'))) {
      return (
        <Text
          style={[styles.dataSections.section2.title, styles.link]}
          onPress={() => handleLinkPress(data)}
        >
          {data}
        </Text>
      );
    } else if (typeof data === 'string' && (data.startsWith('http://') || data.startsWith('https://'))) {
      return (
        <Text
          style={[styles.dataSections.section2.title, styles.link]}
          onPress={() => handleLinkPress(data)}
        >
          {data}
        </Text>
      );
    } else if (Array.isArray(data)) {
      return data.map((item, index) => (
        <Text key={index} style={styles.dataSections.section2.title}>
          {item}
          {index < data.length - 1 ? ', ' : ''}
        </Text>
      ));
    } else {
      return <Text style={styles.dataSections.section2.title}>{data}</Text>;
    }
  };
  // --- END: Changes allowed ONLY within the Card component ---

  return (
    <View style={styles.dataSections}>
      <View style={styles.dataSections.section1}>
        <Text style={styles.dataSections.section1.title}>{title}</Text>
      </View>
      <View style={styles.dataSections.section2}>
        {renderData()}
      </View>
    </View>
  );
};

// --- START: NO CHANGES allowed in the ViewEngine component ---
const ViewEngine = ({ viewData, detailScreenName = 'StaffAchievementsDetails' }) => {
  const [data, setData] = useState(null);
  const [sno, setSno] = useState(1);
  const { id } = useParams();
  const { screenName } = useParams();
  const screenData = viewData.filter(item => item.screen === screenName)[0];

  async function fetchData() {
    console.log(screenData);
    let api = screenData.api;

    const apiUrl = api + id;
    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setData(response.data.content[0]);
        console.log(response.data.content[0]);
      } else {
        console.error(
          'Error: Unable to fetch data. Status code:',
          response.status,
        );
        return null;
      }
    } catch (error) {
      setData(404);
    }
  }

  useEffect(() => {
    if (data === null) {
      fetchData();
      console.log(data);
    }
  }, [data]);

  return (
    <React.Fragment>
      {data === null ? (
        <View style={styles.LoadingContainer}>
          <Text style={styles.LoadingContainer.text}>Loading...</Text>
        </View>
      ) : data === 404 ? (
        <View style={styles.LoadingContainer}>
          <Text style={[styles.LoadingContainer.text, { color: 'red' }]}>
            Network Error
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {Object.keys(screenData['feilds']).map((key, index) => {
            return (
              <Card
                title={key}
                key={index}
                data={
                  screenData['feilds'][key][0] === '_'
                    ? screenData['feilds'][key].split('_')[1]
                    : screenData['feilds'][key].includes(' ')
                    ? data[screenData['feilds'][key].split(' ')[1]] ===
                      undefined
                      ? ''
                      : typeof data[screenData['feilds'][key].split(' ')[1]][
                          screenData['feilds'][key].split(' ')[0]
                        ] === 'object' &&
                        !data[screenData['feilds'][key].split(' ')[1]][
                          screenData['feilds'][key].split(' ')[0]
                        ] === null
                      ? data[screenData['feilds'][key].split(' ')[1]][
                          screenData['feilds'][key].split(' ')[0]
                        ].map(item => item.toString() + ' ')
                      : data[screenData['feilds'][key].split(' ')[1]][
                          screenData['feilds'][key].split(' ')[0]
                        ]
                    : typeof data[screenData['feilds'][key]] === 'object'
                    ? ''
                    : data[screenData['feilds'][key]]
                }
              />
            );
          })}
        </ScrollView>
      )}
    </React.Fragment>
  );
};
// --- END: NO CHANGES allowed in the ViewEngine component ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
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
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
  },
  titleHead: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    fontFamily: 'Raleway-Bold',
    backgroundColor: '#e9ecef',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  section1: {
    height: '100%',
    flex: 1.5,
    borderColor: '#ccc',
    float: 'left',
    paddingLeft: 20,
    justifyContent: 'center',

    title: {
      fontWeight: 'bold',
      fontFamily: 'Raleway-Bold',
      color: 'black',
      fontSize: 16,
    },
  },
  section2: {
    height: '100%',
    flex: 10,
    justifyContent: 'center',
    cent: {
      alignItems: 'center',
    },
    title: {
      fontWeight: '400',
      color: 'black',
      fontFamily: 'Raleway-Medium',
      fontSize: 14,
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

  dataSections: {
    width: '100%',
    minHeight: 80,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#dee2e6',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 2,
    section1: {
      flex: 1.5,
      borderRightWidth: 1,
      borderColor: '#dee2e6',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#f1f3f5',
      title: {
        fontWeight: 'bold',
        fontFamily: 'Raleway-Bold',
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        flexWrap: 'wrap',
      },
    },
    section2: {
      flex: 4,
      justifyContent: 'center',
      padding: 10,
      title: {
        fontFamily: 'Raleway-Medium',
        color: '#495057',
        fontSize: 14,
        textAlign: 'left',
        wordWrap: 'break-word',
      },
    },
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default ViewEngine;