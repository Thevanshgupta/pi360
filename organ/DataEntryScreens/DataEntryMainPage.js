import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Routes, Route, useNavigate} from 'react-router-native';
import ResearchDetails from '../dataScreens/research/researchDetails';
import ViewEngine from '../Engine/viewEngine';
import viewData from '../viewScreens.json';
import FormEngine from '../Engine/formEngine';
import formdata from '../json/fromJson.json';
import LoginScreen from '../login/login';
import ConferenceList from '../dataScreens/AcademicResult/resultList';
import BookPublicationsList from '../dataScreens/research/bookPublicationsList';
import AllListDisplayView from '../screens/allListDisplayView';
import ResearchList from '../dataScreens/research/researchList';
import ResearchGuidanceList from '../dataScreens/research/researchGuidanceList';
import ProjectList from '../dataScreens/research/projectList';
import YourScreen from '../test'
import GuestLecturesDetails from '../dataScreens/DepartmentalActivities/guestLecturesDetails';
import ResearchGate from '../MainScreen/researchgate';

const DataEntryMainPage = props => {
  const navigate = useNavigate();
  return (
    <View style={styles.MainContainer}>
      <View style={styles.topBar}>
        <View style={styles.topBarSections}>
          <TouchableOpacity
            onPress={() => {
              navigate(-1);
            }}>
            <Image
              style={styles.backImage}
              source={require('../assets/backbtn.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.topBarSection1}>
          <View style={styles.topBarSection1.titleBar}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </View>
        <View style={styles.topBarSections}></View>
      </View>
      <View style={styles.ScreenBody}>
      <Routes>
  <Route path="data/alllist/" element={<AllListDisplayView />} />
  <Route path="/researchgate" element={<ResearchGate />} />
  <Route
    path="data/ResearchForm/"
    element={
      <FormEngine
        formName={'ResearchForm'}
        formData={formdata}
      />
    }
  />
  {/* <Route path="data/ResearchForm/" element={<YourScreen />}></Route> */}
  <Route path="data/ResearchList/" element={<ResearchList />} />
  <Route
    path="data/researchguidanceList"
    element={<ResearchGuidanceList />}
  />
  <Route
    path="data/projectlist"
    element={<ProjectList />}
  />
  <Route
    path="data/:screenName/:id"
    element={<ViewEngine viewData={viewData} />}
  />
</Routes>
      </View>
    </View>
  );
};
const statusBarHeight = StatusBar.currentHeight || 0;
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
  },
  backImage: {
    height: 20,
    width: 20,
  },
  topBarSection1: {
    flex: 9,
    titleBar: {
      flex: 1,
      paddingLeft: 20,
      justifyContent: 'center',
      backgroundColor: 'rgba(98, 141, 130, 0.1)',
      margin: 10,
      marginTop: 12,
      borderRadius: 8,
    },
  },
  topBarSections: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  TopBarImgs: {
    width: 30,
    height: 30,
  },
  ScreenBody: {
    // height: Dimensions.get('window').height ,
    flex: 11,
  },
  title: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Raleway-Medium',
  },
});

export default DataEntryMainPage;
