import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import {SelectBoxButton} from './DataEntryScreens/FeildComponents';

const YourScreen = () => {
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const stateId = 11; // Replace {your-state-id} with the actual state ID

  useEffect(() => {
    // Fetch data from API when component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiKey = 'R0dqSDg3Njc2cC00NCNAaHg=';
      const apiUrl = `https://pi360.net/site/api/endpoints/api_cities_in_state.php?institute_id=mietjammu&key=${apiKey}&rs=${stateId}`;

      const response = await axios.get(apiUrl).then(res => {
        console.log(res.data);
      });
      setDropdownOptions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dropdown options:', error);
      setLoading(false);
    }
  };

  const handleDropdownChange = (itemValue, itemIndex) => {
    setSelectedCity(itemValue);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <SelectBoxButton />
      <DisplaySelectedCity selectedCity={selectedCity} />
    </View>
  );
};

const DisplaySelectedCity = ({selectedCity}) => {
  return (
    <View>
      <Text>Selected City: {selectedCity}</Text>
    </View>
  );
};

export default YourScreen;
