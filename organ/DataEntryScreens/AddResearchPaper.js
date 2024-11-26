import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {
  LongInputField,
  ShortInputField,
  SelectBoxButton,
  DatePickerButton,
  BigInputField,
} from './FeildComponents';

const AddResearchPaper = () => {
  return (
    <View style={styles.container} behavior={'position'}>
      <KeyboardAvoidingView style={styles.FieldsContainer}>
        <ScrollView
          nestedScrollEnabled={true}
          bounces={false}
          style={{padding: 20, paddingBottom: 0}}>
          <SelectBoxButton
            label="Publication Type "
            value="value"></SelectBoxButton>
          <SelectBoxButton
            label="Publisher Name "
            value="value"></SelectBoxButton>
          <LongInputField label="Paper Title " placeholder="Title" />
          <LongInputField label="Primary Author" placeholder="Author" />
          <LongInputField
            label="Co-author outside institute"
            placeholder="Author OUTSIDE institute (Autofilled)"
          />
          <SelectBoxButton
            label="Publication Year "
            value="value"></SelectBoxButton>
          <SelectBoxButton
            label="Publication Month "
            value="value"></SelectBoxButton>

          <ShortInputField
            label1="KeyWords "
            placeholder1=""
            label2="Page Number "
            placeholder2="234-256 or xiv-xvii"
          />
          <BigInputField label="Abstract " placeholder="Abstract" />
          <SelectBoxButton label="Status " value="value"></SelectBoxButton>

          <LongInputField label="ResearchGate URL " placeholder="URL" />
          <LongInputField
            label="DOI  "
            placeholder="e.g.10.1007/978-3-319-43434-6_34"
          />
          <ShortInputField
            label1="Volume "
            placeholder1="Add volume"
            label2="Issue "
            placeholder2="Add issue"
          />
          <LongInputField label="Published In " placeholder="" />
          <ShortInputField
            label1="Paper URL "
            placeholder1="Paper URL"
            label2="Google Scholar URL "
            placeholder2="ADD URL"
          />
          <DatePickerButton></DatePickerButton>
          <View style={{width: '100%', height: 40}}></View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.SubmitButton}>
        <TouchableOpacity style={styles.SubmitButton.button}>
          <Text style={styles.SubmitButton.button.text}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FieldsContainer: {
    marginBottom: 0,
    flex: 12,
  },
  SubmitButton: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    backgroundColor: '#2D96F8',
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      text: {
        fontSize: 20,
        color: 'white',
      },
    },
  },
});

export default AddResearchPaper;
