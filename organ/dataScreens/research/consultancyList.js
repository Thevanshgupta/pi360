import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import axios from 'axios';

const Card = ({ title, date, sno }) => (
  <View style={styles.dataCard}>
    <View style={styles.section1}>
      <Text style={styles.section1.title}>{sno + 1}</Text>
    </View>
    <View style={[styles.section2, styles.section2.cent]}>
      <Text numberOfLines={3} style={styles.section2.titleMain}>
        {title}
      </Text>
    </View>
    <View style={styles.section3}>
      <Text style={styles.section3.titleMain}>{date}</Text>
    </View>
  </View>
);

const ConsultancyList = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    const apiUrl = 'https://pi360.net/site/api/api_consultancy_list.php?institute_id=mietjammu';

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
          <Text style={styles.LoadingContainer.text}>Loading...</Text>
        </View>
      ) : error ? (
        <View style={styles.LoadingContainer}>
          <Text style={styles.LoadingContainer.text}>Error: {error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.titleHead}>
            <View style={styles.section1}>
              <Text style={styles.section1.title}>S No.</Text>
            </View>
            <View style={[styles.section2, styles.section2.cent]}>
              <Text style={styles.section2.title}>Organization Name</Text>
            </View>
            <View style={styles.section3}>
              <Text style={styles.section3.title}>Starting Date</Text>
            </View>
          </View>
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <Card title={item["Consultancy_Details"]["Consultancy_Provided"]} date={item["Consultancy_Details"]["Started_On"]} sno={index} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    LoadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        text: {
            
            fontSize:20,
            fontFamily: "Raleway-Bold",
            color:"#000"
        }
    },
    dataCard: {
        height: 80,
        width: "100%",
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: "#ccc",
    },
    titleHead: {
        height: 40,
        width: "100%",
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: "#ccc",
        fontFamily: "Raleway-Bold",

    },
    section1: {
        height: "100%",
        flex: 1.3,
        borderColor: "#ccc",
        float: "left",
        paddingLeft:20,
        justifyContent: "center",

        title: {
            fontWeight: "bold",
            fontFamily: "Raleway-Bold",
            color: "black"
        }



    },
    section2: {
        height: "100%",
        flex: 8,
        justifyContent: "center",
        cent: {
            alignItems: "center",
        },
        title: {
            fontWeight: "bold",
            color: "black",
            fontFamily: "Raleway-Bold",
        },
        titleMain: {
            color: "blue",
            textTransform: "capitalize",
            fontFamily: "Raleway-Medium",
            textDecorationLine: 'underline',

        }

    },
    section3: {
        height: "100%",
        flex: 3,
        paddingLeft: 20,
        justifyContent: "center",

        title: {
            fontWeight: "bold",
            fontFamily: "Raleway-Bold",
            color: "black"
        },
        titleMain: {
            color: "black",
            fontFamily: "Raleway-Medium",

        }

    }


})
export default ConsultancyList;
