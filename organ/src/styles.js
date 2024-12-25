import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ... all the styles from your original ProfileScreen component ...
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#6C63FF',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'Arial',
  },
  profileInstitute: {
    fontSize: 18,
    color: '#777',
    fontFamily: 'Arial',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 10,
  },
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 18,
    color: '#555',
    fontFamily: 'Arial',
  },
  activeTab: {
    borderBottomColor: '#6C63FF',
  },
  activeTabText: {
    color: '#6C63FF',
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Arial',
  },
  sectionContent: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    fontFamily: 'Arial',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkText: {
    color: '#6C63FF',
    textDecorationLine: 'underline',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#6C63FF',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  indexText: {
    fontSize: 16,
    color: '#555',
    marginRight: 10,
    fontFamily: 'Arial',
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1, // Button takes up the available space
  },
  disabledButton: {
    backgroundColor: '#cccccc', // Style for disabled buttons
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;