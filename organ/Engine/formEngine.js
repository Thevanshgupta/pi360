import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  LongInputField,
  ShortInputField,
  SelectBoxButton,
  DatePickerButton,
  BigInputField,
  BigUploadField,
} from '../DataEntryScreens/FeildComponents';

import axios from 'axios';

const FormEngine = ({ formData, formName }) => {
  const [formState, setFormState] = useState({});
  const apiref = useRef('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleInputChange = (fieldName, value = '#') => {
    if (value === '#') {
      setFormState({ ...formState, ...fieldName });
    } else {
      setFormState({ ...formState, [fieldName]: value });
    }
  };

  const handleSubmit = async () => {
    const missingFields = [];
    formData.forEach((form) => {
      if (form.name === formName) {
        Object.keys(form.fields).forEach((fieldName) => {
          const field = form.fields[fieldName];
          if (field.required && !formState[fieldName]) {
            missingFields.push(field.label);
          }
        });
      }
    });

    if (missingFields.length > 0) {
      Alert.alert(
        'Missing Fields',
        `Please fill the following fields: ${missingFields.join(', ')}`
      );
      return;
    }

    const submitObject = [];
    Object.keys(formState).map((key) => {
      submitObject.push({ name: key, value: formState[key] });
    });
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('formData', JSON.stringify(submitObject)); // Convert to JSON string

    if (apiref.current !== '') {
      try {
        const res = await axios.post(apiref.current, formDataToSubmit, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setSuccessMessage('Form submitted successfully!');
      } catch (error) {
        setSuccessMessage('Failed to submit form. Please try again.');
      }
    }
  };

  function renderFeild(currentFeild, fieldIndex) {
    switch (currentFeild.type) {
      case 'text':
        return (
          <LongInputField
            setformstate={handleInputChange}
            formstate={formState}
            key={fieldIndex}
            required={currentFeild.required}
            disabled={currentFeild.disabled}
            label={currentFeild.label}
            name={currentFeild.name}
            placeholder={currentFeild.placeholder}
          />
        );
      case 'selectbox':
        return (
          <SelectBoxButton
            default_value={currentFeild.default_value}
            formstate={formState}
            label={currentFeild.label}
            autofill={currentFeild.autofill ? currentFeild.autofill : ''}
            name={currentFeild.name}
            setformstate={handleInputChange}
            list_empty_text={currentFeild.list_empty_text}
            get_value_from_api={
              currentFeild.get_values_from_api
                ? currentFeild.get_values_from_api
                : '404'
            }
            is_multi={currentFeild.is_multi}
            key={fieldIndex}
            options={currentFeild.options}
          />
        );
      case 'number':
        return (
          <LongInputField
            setformstate={handleInputChange}
            key={fieldIndex}
            required={currentFeild.required}
            keyboardtype="number-pad"
            label={currentFeild.label}
            name={currentFeild.name}
            placeholder={currentFeild.placeholder}
          />
        );
      case 'date':
        return (
          <DatePickerButton
            label={currentFeild.label}
            name={currentFeild.name}
            setformstate={handleInputChange}
            key={fieldIndex}
          />
        );
      case 'textarea':
        return (
          <BigInputField
            label={currentFeild.label}
            name={currentFeild.name}
            placeholder={currentFeild.placeholder}
            setformstate={handleInputChange}
            key={fieldIndex}
          />
        );
      case 'upload':
        return (
          <BigUploadField
            label={currentFeild.label}
            submitApi={currentFeild.submitApi}
            name={currentFeild.name}
            module={currentFeild.module}
            setformstate={handleInputChange}
            key={fieldIndex}
          />
        );
      default:
        return null;
    }
  }

  useEffect(() => {
    if (Object.keys(formState).length === 0) {
      let savedata = {};
      formData.map((form) => {
        if (form.name === formName) {
          Object.keys(form.fields).map((fieldName) => {
            let currentFeild = form.fields[fieldName];
            savedata[currentFeild.name] =
              currentFeild.type === 'number' ? 0 : '';
          });
        }
      });
      setFormState(savedata);
    }
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{formName}</Text>
        {formData.map((form) => {
          if (form.name === formName) {
            return Object.keys(form.fields).map((fieldName, index) =>
              renderFeild(form.fields[fieldName], index)
            );
          }
        })}
        {successMessage ? (
          <Text style={styles.successMessage}>{successMessage}</Text>
        ) : null}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#2D96F8',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default FormEngine;
