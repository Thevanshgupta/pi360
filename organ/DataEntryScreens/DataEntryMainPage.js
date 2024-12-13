import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Routes, Route, useNavigate } from 'react-router-native';
import ResearchDetails from '../dataScreens/research/researchDetails';
import ViewEngine from '../Engine/viewEngine';
import viewData from '../viewScreens.json';
import FormEngine from '../Engine/formEngine';
import formdata from '../json/fromJson.json';
import LoginScreen from '../login/login';
import BookPublicationsList from '../dataScreens/research/bookPublicationsList';
import AllListDisplayView from '../screens/allListDisplayView';
import ResearchList from '../dataScreens/research/researchList';
import ResearchGuidanceList from '../dataScreens/research/researchGuidanceList';
import ProjectList from '../dataScreens/research/projectList';
import YourScreen from '../test';
import ConsultancyList from '../dataScreens/research/consultancyList';
import GuestLecturesDetails from '../dataScreens/DepartmentalActivities/guestLecturesDetails';
import ResearchGate from '../MainScreen/researchgate';
import TrainingList from '../dataScreens/Staff Development/trainingList';
import WorkshopList from '../dataScreens/Staff Development/workshopsList';
import SeminarsList from '../dataScreens/Staff Development/seminarsList';
import ConferenceList from '../dataScreens/Staff Development/conferencesList';
import MembershipList from '../dataScreens/Staff Development/membershipsList';
import IndustrialVisitsList from '../dataScreens/DepartmentalActivities/industrialVisitsList';
import EcontentList from '../dataScreens/Staff Development/eContentList';
import InternshipList from '../dataScreens/Student Placemen/internshipsList';
import HigherStudiesList from '../dataScreens/Student Placemen/higherStudiesList';
import EntrepreneurshipList from '../dataScreens/Student Placemen/entrepreneurshipList';
import StudentAchievementsList from '../dataScreens/Achievements/studentAchievementsList';
import StaffAchievementsList from '../dataScreens/Achievements/staffAchievementsList';
import OtherActivitiesList from '../dataScreens/DepartmentalActivities/otherActivitiesList';
import ValueAddedCourcesList from '../dataScreens/DepartmentalActivities/valueAddedCoursesList';
import GuestLecturesList from '../dataScreens/DepartmentalActivities/guestLecturesList';
import ExtensionLecturesList from '../dataScreens/Staff Development/extensionLecturesList';
import IntellectualProperty from '../dataScreens/IntellectualProperty/intellectualPropertyList';
import ProfileScreen from '../MainScreen/profileScreen';

const DataEntryMainPage = (props) => {
  const navigate = useNavigate();
  const [topBarTitle ,setTopBarTitle] = useState('')
  return (
    <View style={styles.MainContainer}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarSections}>
          <TouchableOpacity onPress={() => {
            setTopBarTitle('')
            navigate(-1)}}>
            <Image
              style={styles.backImage}
              source={require('../assets/backbtn.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.topBarSection1}>
          <View style={styles.topBarSection1.titleBar}>
            <Text style={styles.title}>{topBarTitle===''?props.title:topBarTitle}</Text>
          </View>
        </View>
        <View style={styles.topBarSections} />
      </View>

      {/* Screen Body */}
      <View style={styles.ScreenBody}>
        <Routes> 
        <Route path="/profileScreen" element={<ProfileScreen />} />
          <Route path="data/alllist/" element={<AllListDisplayView />} />
          <Route path="/researchgate" element={<ResearchGate />} />
          <Route
            path="data/ResearchForm/"
            element={<FormEngine setTitle={setTopBarTitle} formName="ResearchForm" formData={formdata} />}
          />
          <Route
            path="data/ADD NEW INTELLECTUAL PROPERTY INFORMATION/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW INTELLECTUAL PROPERTY INFORMATION"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW PROJECT/GRANT INFORMATION/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW PROJECT/GRANT INFORMATION"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/CONSULTANCY/CORPORATE TRAINING INFORMATION/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="CONSULTANCY/CORPORATE TRAINING INFORMATION"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW BOOK PUBLICATION/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW BOOK PUBLICATION"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD RESEARCH GUIDANCE/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD RESEARCH GUIDANCE"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/Add e-Content/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="Add e-Content"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW MEMBERSHIP INFORMATION/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW MEMBERSHIP INFORMATION"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW EXTENSION LECTURES DETAILS/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW EXTENSION LECTURES DETAILS"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW CONFERENCE INFORMATION/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW CONFERENCE INFORMATION"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW SEMINAR INFORMATION/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW SEMINAR INFORMATION"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW WORKSHOP INFORMATION/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW WORKSHOP INFORMATION"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW TRAINING INFORMATION/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW TRAINING INFORMATION"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW GUEST LECTURE/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW GUEST LECTURE"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/ADD NEW INDUSTRIAL VISIT/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="ADD NEW INDUSTRIAL VISIT"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/STUDENTS ACHIEVEMENT/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="STUDENTS ACHIEVEMENT"
                formData={formdata}
              />
            }
          />
          <Route
            path="data/STAFF ACHIEVEMENT/"
            element={
              <FormEngine setTitle={setTopBarTitle}
                formName="STAFF ACHIEVEMENT"
                formData={formdata}
              />
            }
          />
          <Route path="data/ResearchList/" element={<ResearchList />} />
          <Route
            path="data/researchguidanceList"
            element={<ResearchGuidanceList />}
          />
          <Route path="data/projectlist" element={<ProjectList />} />
          <Route
            path="data/IntellectualProperty"
            element={<IntellectualProperty />}
          />
          <Route path="data/ConsultancyList" element={<ConsultancyList />} />
          <Route
            path="data/BookPublicationsList"
            element={<BookPublicationsList />}
          />
          <Route path="data/TrainingList" element={<TrainingList/>} />
          <Route path="data/WorkshopList" element={<WorkshopList />} />
          <Route path="data/SeminarsList" element={<SeminarsList />} />
          <Route path="data/ConferenceList" element={<ConferenceList />} />
          <Route
            path="data/ExtensionLecturesList"
            element={<ExtensionLecturesList />}
          />
          <Route path="data/MembershipList" element={<MembershipList />} />
          <Route path="data/EcontentList" element={<EcontentList />} />
          <Route path="data/GuestLecturesList" element={<GuestLecturesList />} />
          <Route
            path="data/IndustrialVisitsList"
            element={<IndustrialVisitsList />}
          />
          <Route
            path="data/ValueAddedCourcesList"
            element={<ValueAddedCourcesList />}
          />
          <Route path="data/OtherActivitiesList" element={<OtherActivitiesList />} />
          <Route
            path="data/StaffAchievementsList"
            element={<StaffAchievementsList />}
          />
          <Route
            path="data/StudentAchievementsList"
            element={<StudentAchievementsList />}
          />
          <Route
            path="data/EntrepreneurshipList"
            element={<EntrepreneurshipList />}
          />
          <Route path="data/HigherStudiesList" element={<HigherStudiesList />} />
          <Route path="data/InternshipList" element={<InternshipList />} />
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
  ScreenBody: {
    flex: 11,
  },
  title: {
    fontSize: 17,
    color: '#000',
    fontFamily: 'Raleway-Medium',
  },
});

export default DataEntryMainPage;
