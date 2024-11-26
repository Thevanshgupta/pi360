import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, FlatList, Fragment, Alert } from 'react-native';
import axios from 'axios';
import { useNavigate } from 'react-router-native';


const Card = ({ title, date, sno, code }) => {
    
    const navigate = useNavigate()
    return (<View style={styles.dataCard}>
        <View style={styles.section1}><Text style={styles.section1.title}>{sno + 1}</Text></View>
        <View style={styles.section2} ><Text onPress={() => {
            navigate("/data/ResearchDetails/" + code)
        }}
            numberOfLines={3} style={styles.section2.titleMain}>{title}</Text></View>
        <View style={styles.section3}><Text style={styles.section3.titleMain}>{date}</Text></View>

    </View>);
}
const ResearchList = () => {
    const [data, setData] = useState(null)
    const [sno, setSno] = useState(1)

    async function fetchData() {
        const apiUrl = 'https://pi360.net/site/api/api_research_publications_list.php?%20institute_id=mietjammu';

        try {
            const response = await axios.get(apiUrl);
            if (response.status === 200) {
                setData(response.data.content);
            } else {
                console.error('Error: Unable to fetch data. Status code:', response.status); return null;
            }
        } catch (error) {
            console.error('Error:', error.message);
            setData(404)
        }
    }
    useEffect(() => {
        if (data === null) {
            fetchData()
        }
    }, [data])


    return (
        <View style={styles.container}>


            {/* {data === null ? "" : data.map((s) => {
                return ()
            })} */}

            {data === null ? <View style={styles.LoadingContainer}><Text style={styles.LoadingContainer.text}>Loading...</Text></View> :
                <React.Fragment><View style={styles.titleHead}>
                    <View style={styles.section1}><Text style={styles.section1.title}>S No.</Text></View>
                    <View style={[styles.section2, styles.section2.cent]}><Text style={styles.section2.title}>Title</Text></View>
                    <View style={styles.section3}><Text style={styles.section3.title}>Filing Date</Text></View>
                </View><FlatList
                        data={data}
                        renderItem={({ item, index }) => <Card title={item["PaperDetails"]["ResearchTitle"]} date={item["PaperDetails"]["Date"]} code={item["PaperDetails"]["Code"]} sno={index}></Card>}
                        keyExtractor={(item, index) => index}
                    /></React.Fragment>}

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    LoadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        text: {

            fontSize: 20,
            fontFamily: "Raleway-Bold",
            color: "#000"
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
        flex: 1.5,
        borderColor: "#ccc",
        float: "left",
        paddingLeft: 20,
        justifyContent: "center",

        title: {
            fontWeight: "bold",
            fontFamily: "Raleway-Bold",
            color: "black"
        }



    },
    section2: {
        height: "100%",
        flex: 10,
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
            fontSize: 12,
            fontFamily: "Raleway-Medium",

        }

    }


})

export default ResearchList;
