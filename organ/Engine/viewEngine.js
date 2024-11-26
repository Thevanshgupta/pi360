import React, {useState, useEffect} from 'react';
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
import {useParams} from 'react-router-native';

const Card = ({title, data}) => {
  return (
    <View style={styles.dataSections}>
      <View style={styles.dataSections.section1}>
        <Text style={styles.dataSections.section1.title}>{title}</Text>
      </View>
      <View style={styles.dataSections.section2}>
        <Text style={styles.dataSections.section2.title}>{data}</Text>
      </View>
    </View>
  );
};
const ViewEngine = ({viewData, detailScreenName = 'StaffAchievementsDetails'}) => {
  const [data, setData] = useState(null);
  const [sno, setSno] = useState(1);
  const {id} = useParams();
  const {screenName} = useParams();
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
          <Text style={[styles.LoadingContainer.text, {color: 'red'}]}>
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
                }></Card>
            );
          })}
        </ScrollView>
      )}
    </React.Fragment>
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
    flex: 1.5,
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
    flex: 10,
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

  dataSections: {
    width: '100%',
    minHeight: 80,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    section1: {
      flex: 1,

      borderRightWidth: 1,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      title: {
        fontWeight: 'bold',
        fontFamily: 'Raleway-Bold',
        color: 'black',
        fontSize: 14,
        flexWrap: 'wrap',
      },
    },
    section2: {
      flex: 4,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      title: {
        fontFamily: 'Raleway-Medium',
        color: 'black',
        fontSize: 14,
        textTransform: 'capitalize',
      },
    },
  },
});

export default ViewEngine;

//  note : fix SeminarsDetails json as it contains list in attended by value
