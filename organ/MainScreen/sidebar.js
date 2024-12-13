import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigate } from 'react-router-native';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sidebar = ({ closeSidebar }) => {
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isStaffDevOpen, setIsStaffDevOpen] = useState(false);
  const [isDeptActivitiesOpen, setIsDeptActivitiesOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isAcademicsOpen, setIsAcademicsOpen] = useState(false);
  const [isNoticesOpen, setIsNoticesOpen] = useState(false);

  const toggleResearch = () => setIsResearchOpen(!isResearchOpen);
  const toggleStaffDev = () => setIsStaffDevOpen(!isStaffDevOpen);
  const toggleDeptActivities = () => setIsDeptActivitiesOpen(!isDeptActivitiesOpen);
  const toggleAchievements = () => setIsAchievementsOpen(!isAchievementsOpen);
  const toggleAcademics = () => setIsAcademicsOpen(!isAcademicsOpen);
  const toggleNotices = () => setIsNoticesOpen(!isNoticesOpen);

  const navigate = useNavigate();
  const { logout } = useAuth();

  function handelLogOut() {
    AsyncStorage.removeItem('authToken');
    logout();
    navigate('/');
  }

  const commonOptions = [
    { text: 'Research Publication', icon: 'book', navigateTo: '/data/ResearchList/' },
    { text: 'Intellectual Property', icon: 'lightbulb', navigateTo: '/data/IntellectualProperty/' },
    { text: 'Projects/Grants', icon: 'coins', navigateTo: '/data/projectlist/' },
    { text: 'Consultancy/Corporate Training', icon: 'building', navigateTo: '/data/ConsultancyList/' },
    { text: 'Book Publication', icon: 'file-alt', navigateTo: '/data/BookPublicationsList/' },
    { text: 'Research Guidance', icon: 'user-graduate', navigateTo: '/data/researchguidanceList/' },
  ];

  const staffDevOptions = [
    { text: 'Training', icon: 'school', navigateTo: '/data/TrainingList/' },
    { text: 'Workshops', icon: 'briefcase', navigateTo: '/data/WorkshopList/' },
    { text: 'Seminars', icon: 'microphone', navigateTo: '/data/SeminarsList/' },
    { text: 'Conferences', icon: 'comments', navigateTo: '/data/ConferenceList/' },
    { text: 'Extension Lectures', icon: 'chalkboard', navigateTo: '/data/ExtensionLecturesList/' },
    { text: 'Memberships', icon: 'id-card', navigateTo: '/data/MembershipList/' },
    { text: 'E-Content', icon: 'file-code', navigateTo: '/data/EcontentList/' },
  ];

  const deptActivitiesOptions = [
    { text: 'Guest Lecture', icon: 'users', navigateTo: '/data/GuestLecturesList/' },
    { text: 'Industrial Visit', icon: 'industry', navigateTo: '/data/IndustrialVisitsList/' },
    { text: 'Value-Added Courses', icon: 'graduation-cap', navigateTo: '/data/ValueAddedCourcesList/' },
    { text: 'Activities', icon: 'check-square', navigateTo: '/data/OtherActivitiesList/' },
  ];

  const achievementsOptions = [
    { text: 'Staff Achievements', icon: 'trophy', navigateTo: '/data/StaffAchievementsList/' },
    { text: 'Student Achievements', icon: 'medal', navigateTo: '/data/StudentAchievementsList/' },
  ];

  const academicsOptions = [
    { text: 'Subject mapped to Student', icon: 'map', navigateTo: '/data/NewResearch/' },
    { text: 'Manage My Subjects', icon: 'list', navigateTo: '/data/NewResearch/' },
  ];

  const noticesOptions = [
    { text: 'Create Notice', icon: 'bullhorn', navigateTo: '/data/NewResearch/' },
  ];

  const renderOptions = (options) =>
    options.map((option, index) => (
      <SidebarOption
        key={index}
        icon={option.icon}
        text={option.text}
        navigateTo={option.navigateTo}
        onPress={closeSidebar}
        style={styles.subOption}
      />
    ));

  return (
    <TouchableWithoutFeedback onPress={closeSidebar}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.sidebarContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>MENU</Text>
            </View>
            <ScrollView
              contentContainerStyle={styles.sidebarOptions}
              showsVerticalScrollIndicator={false} // Disable default scroll bar
            >
              <SidebarOption icon="bell" text="Notifications" onPress={closeSidebar} />
              <SidebarOption icon="home" text="Home" onPress={closeSidebar} />
              <SidebarOption icon="chart-line" text="Institutional Dashboard" onPress={closeSidebar} />
              <SidebarOption icon="building-columns" text="Departmental Dashboard" onPress={closeSidebar} />
              <SidebarOption icon="graduation-cap" text="Student Dashboard" onPress={closeSidebar} />
              <SidebarOption icon="bar-chart" text="Trend Analysis" onPress={closeSidebar} />
              <SidebarOption icon="file-alt" text="Reports" onPress={closeSidebar} />
              <SidebarOption icon="user-tie" text="Faculty Profile" onPress={closeSidebar} />
              <SidebarOption icon="user" text="My Profile" onPress={closeSidebar} />
              <SidebarOption icon="file-alt" text="OBE Panel" onPress={closeSidebar} />

              <Text style={styles.sectionTitle}>My Department</Text>

              {/* Research */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleResearch}>
                <Icon name="layer-group" size={20} color="#fff" />
                <Text style={styles.optionText}>Research</Text>
                <Icon name={isResearchOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isResearchOpen && <View style={styles.accordionList}>{renderOptions(commonOptions)}</View>}

              {/* Staff Development */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleStaffDev}>
                <Icon name="user-graduate" size={20} color="#fff" />
                <Text style={styles.optionText}>Staff Development</Text>
                <Icon name={isStaffDevOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isStaffDevOpen && <View style={styles.accordionList}>{renderOptions(staffDevOptions)}</View>}

              {/* Departmental Activities */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleDeptActivities}>
                <Icon name="building" size={20} color="#fff" />
                <Text style={styles.optionText}>Departmental Activities</Text>
                <Icon name={isDeptActivitiesOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isDeptActivitiesOpen && (
                <View style={styles.accordionList}>{renderOptions(deptActivitiesOptions)}</View>
              )}

              {/* Achievements */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleAchievements}>
                <Icon name="trophy" size={20} color="#fff" />
                <Text style={styles.optionText}>Achievements</Text>
                <Icon name={isAchievementsOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isAchievementsOpen && <View style={styles.accordionList}>{renderOptions(achievementsOptions)}</View>}

              {/* Academics */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleAcademics}>
                <Icon name="graduation-cap" size={20} color="#fff" />
                <Text style={styles.optionText}>Academics</Text>
                <Icon name={isAcademicsOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isAcademicsOpen && <View style={styles.accordionList}>{renderOptions(academicsOptions)}</View>}

              {/* Notices */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleNotices}>
                <Icon name="bullhorn" size={20} color="#fff" />
                <Text style={styles.optionText}>Notices</Text>
                <Icon name={isNoticesOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isNoticesOpen && <View style={styles.accordionList}>{renderOptions(noticesOptions)}</View>}

              {/* Close and Logout Buttons */}
              <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}>
                <Icon name="window-close" size={16} color="#fff" />
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={handelLogOut}>
                <Icon name="power-off" size={16} color="#fff" />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

// SidebarOption Component
const SidebarOption = ({ icon, text, onPress, style, navigateTo }) => {
  const navigate = useNavigate();
  const handlePress = () => {
    if (navigateTo) navigate(navigateTo);
    onPress?.();
  };

  return (
    <TouchableOpacity style={[styles.option, style]} onPress={handlePress}>
      <Icon name={icon} size={16} color="#fff" style={styles.icon} />
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay
    zIndex: 999,
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#2C3E50', // Deep blue-gray color
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRightWidth: 3,
    borderColor: '#34495E', // Slightly darker shade for border
    zIndex: 1000,
  },
  titleContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#34495E',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ECF0F1', // Light color for title
  },
  sidebarOptions: {
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#ECF0F1',
    paddingVertical: 10,
    marginBottom: 5,
  },
  accordionToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#34495E',
  },
  accordionList: {
    paddingLeft: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  subOption: {
    paddingLeft: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#ECF0F1',
    marginLeft: 10,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E74C3C', // Red background color for close
    borderRadius: 25,
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#3498DB', // Blue background for logout
    borderRadius: 25,
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});

export default Sidebar;
