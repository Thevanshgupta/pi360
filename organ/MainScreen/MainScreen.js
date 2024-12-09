import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import {useNavigate} from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Sidebar from './sidebar'; // Assuming you have a Sidebar component

const MainScreen = () => {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [nestedModalVisible, setNestedModalVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false); // New state for the sidebar visibility

  const handleNavigation = key => {
    setModalVisible(false); // Close the main modal
    if (key === 'research') {
      setNestedModalVisible(true); // Open nested modal for "Research Publication"
    } else {
      navigate('/action', {state: {data: key}});
    }
  };
  const closeSidebar = () => setSidebarVisible(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => setSidebarVisible(!sidebarVisible)} // Toggle sidebar visibility
      >
        <Icon name="bars" size={30} color="#000" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigate('/login')} // Navigate to the login screen
      >
        <Icon name="user" size={30} color="#000" />
      </TouchableOpacity>

      {/* Render Sidebar when sidebarVisible is true */}
      {sidebarVisible && <Sidebar closeSidebar={closeSidebar} />}

      <Text style={styles.title}>Pi360</Text>

      <View style={styles.iconContainer}>
        {/* Main Research Button */}
        <TouchableOpacity
          style={styles.cell}
          onPress={() => setModalVisible(true)}>
          <Icon name="researchgate" size={30} color="#000" />
          <Text style={styles.mainiconstext}>Research</Text>
        </TouchableOpacity>

        {/* Additional Main Buttons */}
        <TouchableOpacity
          style={styles.cell}
          onPress={() => {
            navigate('/data/staff');
          }}>
          <Icon name="person-chalkboard" size={30} color="#000" />
          <Text style={styles.mainiconstext}>Staff</Text>
        </TouchableOpacity>

        <View style={styles.cell}>
          <Icon name="brain" size={30} color="#000" />
          <Text style={styles.mainiconstext}>IP</Text>
        </View>

        <View style={styles.cell}>
          <Icon name="child" size={30} color="#000" />
          <Text style={styles.mainiconstext}>Student</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          <Icon name="school" size={30} color="#000" />
          <Text style={styles.mainiconstext}>Academic</Text>
        </View>
        <View style={styles.cell}>
          <Icon name="chart-line" size={30} color="#000" />
          <Text style={styles.mainiconstext}>Activities</Text>
        </View>
        <View style={styles.cell}>
          <Icon name="trophy" size={30} color="#000" />
          <Text style={styles.mainiconstext}>Achievements</Text>
        </View>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigate('/home')}>
          <Image
            style={styles.navImgs.home}
            source={require('../assets/home.png')}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <Pressable
          style={styles.navItem}
          onPress={() => navigate('/ResearchGate')}>
          <Image
            style={styles.navImgs.home}
            source={require('../assets/res.png')}
          />
          <Text style={styles.navText}>Research</Text>
        </Pressable>

        <TouchableOpacity
          onPress={() => navigate('/profile')}
          style={styles.topBarSections}
        />

        <Pressable
          style={styles.navItem}
          onPress={() => navigate('/data/eContentList')}>
          <Image
            style={styles.navImgs.home}
            source={require('../assets/staff.png')}
          />
          <Text style={styles.navText}>Staff</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigate('/data/GuestLecturesDetails')}>
          <Image
            style={styles.navImgs.home}
            source={require('../assets/dept.png')}
          />
          <Text style={styles.navText}>Department</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigate('/data/alllist/')}>
          <Image
            style={styles.navImgs.home}
            source={require('../assets/achi.png')}
          />
          <Text style={styles.navText}>My Department</Text>
        </Pressable>
      </View>

      {/* Modal for Research Options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={nestedModalVisible}
        onRequestClose={() => setNestedModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Research Publication </Text>
            <TouchableOpacity
              style={[styles.optionButton, styles.closeButton]}
              onPress={() => setNestedModalVisible(false)}>
              <Text style={styles.optionText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.closeButton]}
              onPress={() => setNestedModalVisible(false)}>
              <Text style={styles.optionText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.closeButton]}
              onPress={() => setNestedModalVisible(false)}>
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.closeButton]}
              onPress={() => setNestedModalVisible(false)}>
              <Text style={styles.optionText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Research Options</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleNavigation('research')}>
              <Icon name="researchgate" size={20} color="#000" />
              <Text style={styles.optionText}>Research Publication</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleNavigation('intellectual')}>
              <Icon name="brain" size={20} color="#000" />
              <Text style={styles.optionText}>Intellectual Property</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleNavigation('projects')}>
              <Icon name="project-diagram" size={20} color="#000" />
              <Text style={styles.optionText}>Projects/Grants</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleNavigation('consultancy')}>
              <Icon name="chalkboard-teacher" size={20} color="#000" />
              <Text style={styles.optionText}>
                Consultancy/Corporate Training
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleNavigation('book')}>
              <Icon name="book" size={20} color="#000" />
              <Text style={styles.optionText}>Book Publication</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleNavigation('guidance')}>
              <Icon name="user-graduate" size={20} color="#000" />
              <Text style={styles.optionText}>Research Guidance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.optionButton, styles.closeButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.optionText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sidebarButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 999,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  cell: {
    alignItems: 'center',
    margin: 10,
  },
  mainiconstext: {
    fontSize: 14,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#f44336',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
  },
  loginButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },  
  navImgs: {
    home: {
      width: 20,
      height: 20,
    },
  },
});

export default MainScreen;