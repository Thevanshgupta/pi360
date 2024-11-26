import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import ResearchList from '../dataScreens/research/researchList';
import {useNavigate} from 'react-router-native';

const Card = ({title, path, sno}) => {
  const navigate = useNavigate();
  return (
    <TouchableOpacity
      style={styles.dataCard}
      onPress={() => {
        navigate(path);
      }}>
      <View style={[styles.section2, styles.section2.cent]}>
        <Text numberOfLines={3} style={styles.section2.titleMain}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const AllListDisplayView = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const ListScreens = [
    {
      name: 'Research List',
      path: '/data/ResearchList/',
    },
    {
      name: 'Research Guidance List',
      path: '/data/researchguidanceList/',
    },
    {
      name: 'Project List',
      path: '/data/projectlist',
     },
    {
      name: 'GuestLecturesList',
      path: '/data/projectlist'
    }
  ];

  useEffect(() => {
    if (!data) {
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <>
        {ListScreens.map(data => {
          return <Card title={data['name']} path={data['path']}></Card>;
        })}
      </>
    </View>
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
    flex: 0.4,
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
    flex: 9,
    justifyContent: 'center',
    paddingLeft: 20,

    title: {
      fontWeight: 'bold',
      color: 'black',
      fontFamily: 'Raleway-Bold',
    },
    titleMain: {
      color: 'black',
      textTransform: 'capitalize',
      fontSize: 18,

      fontFamily: 'Raleway-Medium',
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
  addbutton: {
    backgroundColor: '#00FF00',
    width: '100%',
    margin: '20px',
  },
});
export default AllListDisplayView;
