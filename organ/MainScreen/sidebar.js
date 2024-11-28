import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // FontAwesome6 import

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

  const commonOptions = [
    'Research Publication',
    'Intellectual Property',
    'Projects/Grants',
    'Consultancy/Corporate Training',
    'Book Publication',
    'Research Guidance',
  ];

  const staffDevOptions = ['Training', 'Workshops', 'Seminars', 'Conferences','Extension Lectures', 'Memberships','E-Content'];

  const deptActivitiesOptions = ['Guest Lecture', 'Industrial Visit', 'Value-Added Courses','Activities'];

  const achievementsOptions = ['Staff Achievements', 'Student Achievements'];

  const academicsOptions = ['Subject mapped to Student', 'Manage My Subjects'];

  const noticesOptions = ['Create Notice'];

  return (
    <TouchableWithoutFeedback onPress={closeSidebar}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.sidebarContainer}>
            {/* Core UI Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>MENU</Text>
            </View>

            {/* Scrollable Sidebar Options */}
            <ScrollView contentContainerStyle={styles.sidebarOptions}>
              <SidebarOption icon="bell" text="Notifications" onPress={closeSidebar} />
              <SidebarOption icon="home" text="Home" onPress={closeSidebar} />
              <SidebarOption icon="chart-line" text="Institutional Dashboard" onPress={closeSidebar} />
              <SidebarOption icon="building-columns" text="Departmental Dashboard" onPress={closeSidebar} />
              <SidebarOption icon="graduation-cap" text="Student Dashboard" onPress={closeSidebar} />
              <SidebarOption icon="trend-up" text="Trend Analysis" onPress={closeSidebar} />
              <SidebarOption icon="file-alt" text="Reports" onPress={closeSidebar} />
              <SidebarOption icon="user-tie" text="Faculty Profile" onPress={closeSidebar} />
              {/* <SidebarOption icon="briefcase" text="My Department" onPress={closeSidebar} /> */}
              <SidebarOption icon="user" text="My Profile" onPress={closeSidebar} />
              <SidebarOption icon="user-cog" text="OBE Panel" onPress={closeSidebar} />

              <Text style={styles.sectionTitle}>My Department</Text>

              {/* Research Section */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleResearch}>
                <Icon name="layer-group" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.optionText}>Research</Text>
                <Icon name={isResearchOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isResearchOpen && (
                <View style={styles.accordionList}>
                  {commonOptions.map((option, index) => (
                    <SidebarOption
                      key={index}
                      icon="circle"
                      text={option}
                      onPress={closeSidebar}
                      style={styles.subOption}
                    />
                  ))}
                </View>
              )}

              {/* Staff Development Section */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleStaffDev}>
                <Icon name="user-graduate" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.optionText}>Staff Development</Text>
                <Icon name={isStaffDevOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isStaffDevOpen && (
                <View style={styles.accordionList}>
                  {staffDevOptions.map((option, index) => (
                    <SidebarOption
                      key={index}
                      icon="circle"
                      text={option}
                      onPress={closeSidebar}
                      style={styles.subOption}
                    />
                  ))}
                </View>
              )}

              {/* Departmental Activities Section */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleDeptActivities}>
                <Icon name="building" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.optionText}>Departmental Activities</Text>
                <Icon name={isDeptActivitiesOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isDeptActivitiesOpen && (
                <View style={styles.accordionList}>
                  {deptActivitiesOptions.map((option, index) => (
                    <SidebarOption
                      key={index}
                      icon="circle"
                      text={option}
                      onPress={closeSidebar}
                      style={styles.subOption}
                    />
                  ))}
                </View>
              )}

              {/* Achievements Section */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleAchievements}>
                <Icon name="trophy" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.optionText}>Achievements</Text>
                <Icon name={isAchievementsOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isAchievementsOpen && (
                <View style={styles.accordionList}>
                  {achievementsOptions.map((option, index) => (
                    <SidebarOption
                      key={index}
                      icon="circle"
                      text={option}
                      onPress={closeSidebar}
                      style={styles.subOption}
                    />
                  ))}
                </View>
              )}

              {/* Academics Section */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleAcademics}>
                <Icon name="graduation-cap" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.optionText}>Academics</Text>
                <Icon name={isAcademicsOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isAcademicsOpen && (
                <View style={styles.accordionList}>
                  {academicsOptions.map((option, index) => (
                    <SidebarOption
                      key={index}
                      icon="circle"
                      text={option}
                      onPress={closeSidebar}
                      style={styles.subOption}
                    />
                  ))}
                </View>
              )}

              {/* Notices Section */}
              <TouchableOpacity style={styles.accordionToggle} onPress={toggleNotices}>
                <Icon name="bullhorn" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.optionText}>Notices</Text>
                <Icon name={isNoticesOpen ? 'caret-up' : 'caret-down'} size={16} color="#fff" />
              </TouchableOpacity>
              {isNoticesOpen && (
                <View style={styles.accordionList}>
                  {noticesOptions.map((option, index) => (
                    <SidebarOption
                      key={index}
                      icon="circle"
                      text={option}
                      onPress={closeSidebar}
                      style={styles.subOption}
                    />
                  ))}
                </View>
              )}

              <TouchableOpacity style={styles.closeButton} onPress={closeSidebar}>
                <Icon name="times" size={16} color="#fff" />
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const SidebarOption = ({ icon, text, onPress, style }) => (
  <TouchableOpacity style={[styles.option, style]} onPress={onPress}>
    <Icon name={icon} size={16} color="#fff" style={styles.icon} />
    <Text style={styles.optionText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '80%', // Adjust width as needed
    height: '100%',
    backgroundColor: '#1C1F26',
    paddingTop: 20,
    paddingHorizontal: 15,
    zIndex: 1000,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  sidebarOptions: {
    paddingBottom: 20,
  },
  sectionTitle: {
    color: '#6C757D',
    fontSize: 12,
    marginVertical: 10,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 2,
    borderRadius: 6,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  accordionToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 6,
    justifyContent: 'space-between',
  },
  accordionList: {
    paddingLeft: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#6C757D',
  },
  subOption: {
    paddingVertical: 8,
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
    backgroundColor: '#FF6347',
    borderRadius: 8,
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default Sidebar;
