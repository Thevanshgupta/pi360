import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Linking, TouchableOpacity, ScrollView, FlatList, Fragment } from 'react-native';
import axios from 'axios';


const Card = ({ title, data }) => {

    return (
        <View style={styles.dataSections}>
            <View style={styles.dataSections.section1}>
                <Text style={styles.dataSections.section1.title}>{title}</Text>
            </View>
            <View style={styles.dataSections.section2}><Text style={styles.dataSections.section2.title}>{data}</Text></View>
        </View>
    );
}
const BookPublicationsDetails = () => {
    const [data, setData] = useState(null)
    const [sno, setSno] = useState(1)

    async function fetchData() {
        const apiUrl = 'https://pi360.net/site/api/api_books_publication_details.php?%20institute_id=mietjammu&rs=1';

        try {
            const response = await axios.get(apiUrl);
            if (response.status === 200) {
                setData(response.data.content[0]);
                console.log(response.data.content[0])
            } else {
                console.error('Error: Unable to fetch data. Status code:', response.status); return null;
            }
        } catch (error) {
            setData(404)
        }
    }
    useEffect(() => {
        if (data === null) {
            fetchData()
            console.log(data)
        }
    }, [data])
    return (
        <React.Fragment>
            {data === null ? <View style={styles.LoadingContainer}><Text style={styles.LoadingContainer.text}>Loading...</Text></View> :
                data === 404 ? <View style={styles.LoadingContainer}><Text style={[styles.LoadingContainer.text, { color: "red" }]}>Network Error</Text></View> :
                    <ScrollView style={styles.container}>
                         <Card title="Book Title " data={data["Book_List"]["Book_Title"]}></Card>
                        <Card title="Detail " data={data["Book_List"]["Detail"]}></Card> 
                        <Card title="Main Author" data={data["Book_List"]["Main_Author"]}></Card>
                        <Card title="Published On" data={data["Book_List"]["Published_On"]}></Card>
                        <Card title="Publisher Name" data={data["Book_List"]["Publisher_Name"]}></Card>
                        <Card title="Publisher Country" data={data["Book_List"]["Publisher_Country"]}></Card>
                        <Card title="ISBN" data={data["Book_List"]["ISBN"]}></Card>
                        <Card title="Main Author" data={data["Author_Details"]["Main_Author"]}></Card>
                        <Card title="Co Authors" data={data["Author_Details"]["Co_Authors"]}></Card>
                        <Card title="Proof of Acceptance(pdf)" data={<Text style={{ color: 'blue' }}
                            onPress={() => Linking.openURL("https:\/\/pi360.net\/mietjammu" + data["Book_List"]["Acceptance_Proof"].replace(/\//g, "/"))}>
                            Download
                        </Text>}></Card>



                    </ScrollView>
            }</React.Fragment>
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
            fontFamily: "Raleway-Medium",

        }

    },

    dataSections: {
        width: "100%",
        minHeight: 80,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: '#ccc',
        section1: {
            flex: 1,

            borderRightWidth: 1,
            borderColor: '#ccc',
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 20,
            paddingRight: 20,
            title: {
                fontWeight: "bold",
                fontFamily: "Raleway-Bold",
                color: "black",
                fontSize: 14,
                flexWrap: 'wrap'
            }

        },
        section2: {
            flex: 4,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            title: {
                fontFamily: "Raleway-Medium",
                color: "black",
                fontSize: 14,
                textTransform: "capitalize",
            }
        }
    }
})

export default BookPublicationsDetails;
