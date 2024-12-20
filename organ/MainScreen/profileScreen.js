import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome6";
import Sidebar from "./sidebar";
import ProfileHeader from "../src/ProfileHeader";
import ProfileTabs from "../src/ProfileTabs";
import PersonalDetails from "../src/PersonalDetails";
import PerformanceIndices from "../src/PerformanceIndices";
import Patents from "../src/Patents";
import ResearchPapers from "../src/ResearchPapers";
import Projects from "../src/Projects";
import StaffTrainings from "../src/StaffTrainings";
import StaffWorkshops from "../src/StaffWorkshops";
import StaffSeminars from "../src/StaffSeminars";
import StaffValueAddedCourses from "../src/StaffValueAddedCourses";
import StaffOtherActivities from "../src/StaffOtherActivities";
import { preloadTitles } from "../src/utils";
import styles from "../src/styles";

const ProfileScreen = () => {
  const { userData } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [titles, setTitles] = useState({});

  const closeSidebar = () => setSidebarVisible(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        const preloadData = async () => {
          let updatedTitles = { ...titles };
          if (userData.Patents?.length) {
            const newTitles = await preloadTitles(
              userData.Patents,
              "patentCode",
              "patent",
              updatedTitles
            );
            updatedTitles = { ...updatedTitles, ...newTitles };
          }
          if (userData.ResearchPapers?.length) {
            const newTitles = await preloadTitles(
              userData.ResearchPapers,
              "researchCode",
              "research",
              updatedTitles
            );
            updatedTitles = { ...updatedTitles, ...newTitles };
          }
          if (userData.Projects?.length) {
            const newTitles = await preloadTitles(
              userData.Projects,
              "projectCode",
              "project",
              updatedTitles
            );
            updatedTitles = { ...updatedTitles, ...newTitles };
          }
          if (userData.StaffTrainings?.length) {
            const newTitles = await preloadTitles(
              userData.StaffTrainings,
              "trainingCode",
              "training",
              updatedTitles
            );
            updatedTitles = { ...updatedTitles, ...newTitles };
          }
          if (userData.StaffWorkshops?.length) {
            const newTitles = await preloadTitles(
              userData.StaffWorkshops,
              "workshopCode",
              "workshop",
              updatedTitles
            );
            updatedTitles = { ...updatedTitles, ...newTitles };
          }
          if (userData.StaffSeminars?.length) {
            const newTitles = await preloadTitles(
              userData.StaffSeminars,
              "seminarCode",
              "seminar",
              updatedTitles
            );
            updatedTitles = { ...updatedTitles, ...newTitles };
          }
          if (userData.StaffValueAddedCourses?.length) {
            const newTitles = await preloadTitles(
              userData.StaffValueAddedCourses,
              "valueAddedCode",
              "valueAddedCourse",
              updatedTitles
            );
            updatedTitles = { ...updatedTitles, ...newTitles };
          }
          if (userData.StaffOtherActivities?.length) {
            const newTitles = await preloadTitles(
              userData.StaffOtherActivities,
              "activityCode",
              "otherActivity",
              updatedTitles
            );
            updatedTitles = { ...updatedTitles, ...newTitles };
          }
          setTitles(updatedTitles);
        };

        preloadData();
      }
    };
    fetchData();
  }, [userData]); // Add userData to dependency array

  if (!userData) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Fetching your profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => setSidebarVisible(!sidebarVisible)}
      >
        <Icon name="bars" size={30} color="#000" />
      </TouchableOpacity>
      {sidebarVisible && <Sidebar closeSidebar={closeSidebar} />}

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader userData={userData} />
        <ProfileTabs activeTab={activeTab} handleTabChange={handleTabChange} />

        {activeTab === "personal" && <PersonalDetails userData={userData} />}
        {activeTab === "performance Indices" && (
          <PerformanceIndices userData={userData} />
        )}
        {activeTab === "patents" && (
          <Patents userData={userData} titles={titles} />
        )}
        {activeTab === "research" && (
          <ResearchPapers userData={userData} titles={titles} />
        )}
        {activeTab === "projects" && (
          <Projects userData={userData} titles={titles} />
        )}
        {activeTab === "Staff Training" && (
          <StaffTrainings userData={userData} titles={titles} />
        )}
        {activeTab === "Staff Workshops" && (
          <StaffWorkshops userData={userData} titles={titles} />
        )}
        {activeTab === "Staff Seminars" && (
          <StaffSeminars userData={userData} titles={titles} />
        )}
        {activeTab === "Staff Value Added Courses" && (
          <StaffValueAddedCourses userData={userData} titles={titles} />
        )}
        {activeTab === "Staff Other Activities" && (
          <StaffOtherActivities userData={userData} titles={titles} />
        )}
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;